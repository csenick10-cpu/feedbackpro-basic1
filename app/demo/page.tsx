import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">See FeedbackPro in Action</h1>
          <p className="text-xl text-muted-foreground">
            Explore our demo to see how FeedbackPro can transform your customer feedback management
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <CardTitle>Review Management</CardTitle>
              </div>
              <CardDescription>Centralize reviews from all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Reviews</span>
                  <Badge>1,248</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Rating</span>
                  <Badge variant="outline">4.2 ⭐</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Rate</span>
                  <Badge className="bg-green-100 text-green-800">87%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <CardTitle>Sentiment Analysis</CardTitle>
              </div>
              <CardDescription>AI-powered insights from reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Positive Sentiment</span>
                  <Badge className="bg-green-100 text-green-800">72%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Top Topic</span>
                  <Badge variant="outline">Customer Service</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trend</span>
                  <Badge className="bg-blue-100 text-blue-800">Improving</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <CardTitle>Feedback Portal</CardTitle>
              </div>
              <CardDescription>Custom forms for direct feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Forms</span>
                  <Badge>3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Submissions</span>
                  <Badge variant="outline">211</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Rating</span>
                  <Badge className="bg-yellow-100 text-yellow-800">4.5 ⭐</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Join thousands of businesses using FeedbackPro to improve their customer experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Try Dashboard
              </Button>
            </Link>
            <Link href="/reviews">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                View Reviews
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                See Analytics
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              This is a demo version with sample data. All features are fully functional for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
