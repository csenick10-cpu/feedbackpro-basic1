import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart } from "@/components/charts"
import { Progress } from "@/components/ui/progress"

export function SMSAnalytics() {
  const campaignStats = [
    {
      name: "Post-Purchase Review Request",
      sent: 342,
      delivered: 338,
      responses: 82,
      reviews: 67,
      optOuts: 3,
    },
    {
      name: "Service Follow-up",
      sent: 156,
      delivered: 154,
      responses: 38,
      reviews: 29,
      optOuts: 1,
    },
    {
      name: "Delivery Confirmation Review",
      sent: 89,
      delivered: 87,
      responses: 21,
      reviews: 18,
      optOuts: 2,
    },
  ]

  const getDeliveryRate = (sent, delivered) => {
    return sent > 0 ? Math.round((delivered / sent) * 100) : 0
  }

  const getResponseRate = (delivered, responses) => {
    return delivered > 0 ? Math.round((responses / delivered) * 100) : 0
  }

  const getConversionRate = (delivered, reviews) => {
    return delivered > 0 ? Math.round((reviews / delivered) * 100) : 0
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">587</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">579 delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.4%</div>
            <p className="text-xs text-muted-foreground">141 responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.7%</div>
            <p className="text-xs text-muted-foreground">114 reviews generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SMS Performance Over Time</CardTitle>
            <CardDescription>Messages sent and response rates</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Campaign Comparison</CardTitle>
            <CardDescription>Performance by campaign type</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Breakdown</CardTitle>
          <CardDescription>Detailed metrics for each active campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {campaignStats.map((campaign, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <div className="text-sm text-muted-foreground">{campaign.sent} messages sent</div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Delivery Rate</span>
                      <span className="font-medium">{getDeliveryRate(campaign.sent, campaign.delivered)}%</span>
                    </div>
                    <Progress value={getDeliveryRate(campaign.sent, campaign.delivered)} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Response Rate</span>
                      <span className="font-medium">{getResponseRate(campaign.delivered, campaign.responses)}%</span>
                    </div>
                    <Progress value={getResponseRate(campaign.delivered, campaign.responses)} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Review Conversion</span>
                      <span className="font-medium">{getConversionRate(campaign.delivered, campaign.reviews)}%</span>
                    </div>
                    <Progress value={getConversionRate(campaign.delivered, campaign.reviews)} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Opt-outs</span>
                      <span className="font-medium">{campaign.optOuts}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {campaign.delivered > 0 ? ((campaign.optOuts / campaign.delivered) * 100).toFixed(1) : 0}% opt-out
                      rate
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
