"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, Filter, RefreshCw } from "lucide-react"

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState(null)

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
      response:
        "Thank you for your feedback, John! We're glad you enjoyed our service. We're working on improving our wait times and appreciate your patience.",
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
      response: "",
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
      response:
        "We're thrilled to hear you had such a positive experience, Michael! Thank you for your support and recommendations.",
    },
    {
      id: 4,
      platform: "Google",
      author: "Emily Davis",
      avatar: "ED",
      date: "2025-07-22",
      rating: 3,
      content:
        "Average experience. Nothing particularly bad, but nothing stood out either. Could use some improvements in customer service.",
      responded: false,
      response: "",
    },
    {
      id: 5,
      platform: "TripAdvisor",
      author: "David Wilson",
      avatar: "DW",
      date: "2025-07-20",
      rating: 1,
      content:
        "Terrible experience from start to finish. The staff was rude and unhelpful, and the quality was subpar. Would not recommend.",
      responded: false,
      response: "",
    },
  ]

  const handleSelectReview = (review) => {
    setSelectedReview(review)
  }

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
      case "TripAdvisor":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Review Management</h2>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Reviews
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reviews..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="yelp">Yelp</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tripadvisor">TripAdvisor</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>Manage reviews from all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                      selectedReview?.id === review.id ? "border-primary bg-muted/50" : ""
                    }`}
                    onClick={() => handleSelectReview(review)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${review.author}`}
                          />
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.author}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground mt-1">{review.content}</p>
                        </div>
                      </div>
                      <Badge className={getPlatformColor(review.platform)} variant="outline">
                        {review.platform}
                      </Badge>
                    </div>
                    {review.responded && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Responded
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
              <CardDescription>View and respond to the selected review</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReview ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${selectedReview.author}`}
                          />
                          <AvatarFallback>{selectedReview.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{selectedReview.author}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(selectedReview.rating)}</div>
                            <span className="text-xs text-muted-foreground">{selectedReview.date}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getPlatformColor(selectedReview.platform)} variant="outline">
                        {selectedReview.platform}
                      </Badge>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm">{selectedReview.content}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response">Your Response</Label>
                    <Textarea
                      id="response"
                      placeholder="Type your response here..."
                      className="min-h-[100px]"
                      defaultValue={selectedReview.response}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Publish Response</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Response Templates</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start text-left bg-transparent" onClick={() => {}}>
                        <span className="truncate">Thank you for your feedback</span>
                      </Button>
                      <Button variant="outline" className="justify-start text-left bg-transparent" onClick={() => {}}>
                        <span className="truncate">We apologize for your experience</span>
                      </Button>
                      <Button variant="outline" className="justify-start text-left bg-transparent" onClick={() => {}}>
                        <span className="truncate">We'd like to discuss this further</span>
                      </Button>
                      <Button variant="outline" className="justify-start text-left bg-transparent" onClick={() => {}}>
                        <span className="truncate">We're addressing your concerns</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-[400px] items-center justify-center text-center">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Select a review to view details and respond</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
