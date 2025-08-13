import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { reviewText, userId } = await request.json()

    const supabase = createClient()

    // Verify user permissions
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("subscription_status")
      .eq("id", userId)
      .single()

    if (error || !profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Analyze sentiment using AI
    const { text: sentimentAnalysis } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze the sentiment of this review and extract key topics. Return a JSON object with:
      - sentiment: "positive", "neutral", or "negative"
      - confidence: number between 0-1
      - topics: array of key topics mentioned
      - summary: brief summary of the review
      
      Review: "${reviewText}"
      
      Return only valid JSON:`,
    })

    let analysis
    try {
      analysis = JSON.parse(sentimentAnalysis)
    } catch (parseError) {
      // Fallback analysis
      analysis = {
        sentiment: "neutral",
        confidence: 0.5,
        topics: ["general"],
        summary: "Unable to analyze sentiment",
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Sentiment analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}
