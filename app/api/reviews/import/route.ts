import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { platform, businessId, userId } = await request.json()

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

    let reviews = []

    switch (platform) {
      case "google":
        reviews = await importGoogleReviews(businessId)
        break
      case "yelp":
        reviews = await importYelpReviews(businessId)
        break
      case "facebook":
        reviews = await importFacebookReviews(businessId)
        break
      default:
        return NextResponse.json({ error: "Unsupported platform" }, { status: 400 })
    }

    // Store reviews in database
    const reviewsWithUserId = reviews.map((review) => ({
      ...review,
      user_id: userId,
      platform: platform,
    }))

    const { data, error: insertError } = await supabase.from("reviews").insert(reviewsWithUserId).select()

    if (insertError) {
      console.error("Review insert error:", insertError)
      return NextResponse.json({ error: "Failed to store reviews" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      imported: data.length,
      reviews: data,
    })
  } catch (error) {
    console.error("Review import error:", error)
    return NextResponse.json({ error: "Failed to import reviews" }, { status: 500 })
  }
}

async function importGoogleReviews(businessId: string) {
  // Mock Google Reviews API integration
  // In production, use Google My Business API
  return [
    {
      external_id: "google_123",
      author_name: "John Smith",
      rating: 4,
      text: "Great service overall!",
      created_at: new Date().toISOString(),
      responded: false,
    },
  ]
}

async function importYelpReviews(businessId: string) {
  // Mock Yelp API integration
  // In production, use Yelp Fusion API
  return []
}

async function importFacebookReviews(businessId: string) {
  // Mock Facebook API integration
  // In production, use Facebook Graph API
  return []
}
