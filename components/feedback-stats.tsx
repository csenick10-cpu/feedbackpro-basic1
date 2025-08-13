import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FeedbackStats() {
  const feedbackData = [
    {
      question: "How satisfied are you with our product?",
      responses: 124,
      averageRating: 4.2,
      distribution: [5, 10, 15, 40, 30],
    },
    {
      question: "How likely are you to recommend us to a friend?",
      responses: 118,
      averageRating: 3.8,
      distribution: [8, 12, 20, 35, 25],
    },
    {
      question: "How would you rate our customer service?",
      responses: 105,
      averageRating: 4.5,
      distribution: [2, 5, 8, 15, 70],
    },
  ]

  return (
    <div className="space-y-6">
      {feedbackData.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{item.question}</h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.responses} responses</span>
                  <span>Average: {item.averageRating}/5</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-12 text-right">5 ★</div>
                  <Progress value={item.distribution[4]} className="h-2" />
                  <div className="w-12">{item.distribution[4]}%</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-12 text-right">4 ★</div>
                  <Progress value={item.distribution[3]} className="h-2" />
                  <div className="w-12">{item.distribution[3]}%</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-12 text-right">3 ★</div>
                  <Progress value={item.distribution[2]} className="h-2" />
                  <div className="w-12">{item.distribution[2]}%</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-12 text-right">2 ★</div>
                  <Progress value={item.distribution[1]} className="h-2" />
                  <div className="w-12">{item.distribution[1]}%</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-12 text-right">1 ★</div>
                  <Progress value={item.distribution[0]} className="h-2" />
                  <div className="w-12">{item.distribution[0]}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
