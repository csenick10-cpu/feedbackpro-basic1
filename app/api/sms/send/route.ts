import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"
import { createClient } from "@/lib/supabase/server"

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function POST(request: NextRequest) {
  try {
    // Temporary: Return mock response if no phone number configured
    if (!process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_PHONE_NUMBER.includes("placeholder")) {
      return NextResponse.json({
        success: true,
        messageSid: "mock_message_id",
        status: "queued",
        note: "SMS disabled - using mock response for testing",
      })
    }

    const { to, message, campaignId, userId } = await request.json()

    const supabase = createClient()

    // Verify user has permission and active subscription
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("subscription_status, sms_credits")
      .eq("id", userId)
      .single()

    if (error || !profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (profile.subscription_status !== "active" && profile.subscription_status !== "trial") {
      return NextResponse.json({ error: "Active subscription required" }, { status: 403 })
    }

    if (profile.sms_credits <= 0) {
      return NextResponse.json({ error: "Insufficient SMS credits" }, { status: 403 })
    }

    // Send SMS via Twilio
    const smsResult = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    })

    // Log SMS in database
    await supabase.from("sms_logs").insert({
      user_id: userId,
      campaign_id: campaignId,
      to_number: to,
      message: message,
      twilio_sid: smsResult.sid,
      status: smsResult.status,
      cost: 0.02, // Approximate cost per SMS
    })

    // Decrement SMS credits
    await supabase
      .from("profiles")
      .update({
        sms_credits: profile.sms_credits - 1,
      })
      .eq("id", userId)

    return NextResponse.json({
      success: true,
      messageSid: smsResult.sid,
      status: smsResult.status,
    })
  } catch (error) {
    console.error("SMS send error:", error)
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
  }
}
