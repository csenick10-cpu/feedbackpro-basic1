import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { LineChart, BarChart } from "@/components/charts"
import { Badge } from "@/components/ui/badge"

export function WorkflowAnalytics({ workflows }) {
  const selectedWorkflow = workflows[0] // Default to first workflow

  const getStepConversionRate = (currentStep, nextStep) => {
    if (!currentStep || !nextStep) return 0
    return currentStep.sent > 0 ? Math.round((nextStep.sent / currentStep.sent) * 100) : 0
  }

  const getClickThroughRate = (step) => {
    return step.sent > 0 ? Math.round((step.clicked / step.sent) * 100) : 0
  }

  const getOpenRate = (step) => {
    return step.sent > 0 ? Math.round((step.opened / step.sent) * 100) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Workflow Performance</h3>
          <p className="text-sm text-muted-foreground">Analyze step-by-step performance metrics</p>
        </div>
        <Select defaultValue="1">
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select workflow" />
          </SelectTrigger>
          <SelectContent>
            {workflows.map((workflow) => (
              <SelectItem key={workflow.id} value={workflow.id.toString()}>
                {workflow.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedWorkflow.customers}</div>
            <p className="text-xs text-muted-foreground">Customers in workflow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedWorkflow.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Completed full workflow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedWorkflow.reviewRate}%</div>
            <p className="text-xs text-muted-foreground">Left a review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drop-off Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{100 - selectedWorkflow.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Exited workflow early</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Funnel</CardTitle>
            <CardDescription>Step-by-step conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(selectedWorkflow.performance).map(([stepKey, step], index) => {
                const stepNumber = index + 1
                const nextStep = Object.values(selectedWorkflow.performance)[index + 1]
                const conversionRate = getStepConversionRate(step, nextStep)

                return (
                  <div key={stepKey} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Step {stepNumber}</Badge>
                        <span className="text-sm font-medium">Messages Sent</span>
                      </div>
                      <span className="text-sm font-bold">{step.sent}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Opened</span>
                          <span>{getOpenRate(step)}%</span>
                        </div>
                        <Progress value={getOpenRate(step)} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Clicked</span>
                          <span>{getClickThroughRate(step)}%</span>
                        </div>
                        <Progress value={getClickThroughRate(step)} className="h-1" />
                      </div>
                      {nextStep && (
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Continued</span>
                            <span>{conversionRate}%</span>
                          </div>
                          <Progress value={conversionRate} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Workflow metrics trend</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step Performance Comparison</CardTitle>
          <CardDescription>Compare performance across workflow steps</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions to improve your workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-blue-900">Improve Step 2 Timing</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Consider reducing the delay from 3 days to 2 days. Analysis shows 23% higher engagement when
                    follow-ups are sent sooner.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-green-900">Personalize Message Content</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Adding product-specific details to your messages could increase click-through rates by up to 18%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-yellow-900">Add Recovery Step</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    32% of customers drop off after Step 2. Consider adding a recovery message with a different approach
                    or incentive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
