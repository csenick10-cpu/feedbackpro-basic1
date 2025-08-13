import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function RecentReviews() {
  const reviews = [
    {
      id: 1,
      platform: "Google",
      author: "John Smith",
      avatar: "JS",
      date: "2025-08-01",
      rating: 4,
      content:
        "Great service overall! The staff was very friendly and helpful. The only issue was the wait time was a bit longer than expected.",
      responded: true,
    },
    {
      id: 2,
      platform: "Yelp",
      author: "Sarah Johnson",
      avatar: "SJ",
      date: "2025-07-28",
      rating: 2,
      content:
        "Disappointed with my experience. The product quality was not what I expected based on the description online.",
      responded: false,
    },
    {
      id: 3,
      platform: "Facebook",
      author: "Michael Brown",
      avatar: "MB",
      date: "2025-07-25",
      rating: 5,
      content:
        "Absolutely fantastic! Everything exceeded my expectations. Will definitely be coming back and recommending to friends.",
      responded: true,
    },
  ]

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "Google":
        return "bg-blue-100 text-blue-800"
      case "Yelp":
        return "bg-red-100 text-red-800"
      case "Facebook":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${review.author}`} />
                <AvatarFallback>{review.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <Badge className={getPlatformColor(review.platform)} variant="outline">
              {review.platform}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{review.content}</p>
          <div className="mt-4 flex justify-end">
            {review.responded ? (
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Responded
              </Badge>
            ) : (
              <Button variant="outline" size="sm">
                Respond
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
