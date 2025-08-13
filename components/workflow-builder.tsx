"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash, ArrowDown, Clock, MessageSquare, GitBranch, Target } from "lucide-react"

export function WorkflowBuilder() {
  const [workflowSteps, setWorkflowSteps] = useState([
    {
      id: 1,
      type: "message",
      name: "Initial Review Request",
      delay: "24h",
      message: "Hi {name}! Thanks for your purchase from {business}. We'd love your feedback: {review_link}",
      conditions: [],
    },
    {
      id: 2,
      type: "condition",
      name: "Check Response",
      delay: "3d",
      condition: "no_response",
      trueAction: "continue",
      falseAction: "end",
    },
    {
      id: 3,
      type: "message",
      name: "Follow-up Reminder",
      delay: "0h",
      message: "Hi {name}, we noticed you haven't left a review yet. Your opinion helps others: {review_link}",
      conditions: [],
    },
  ])

  const [selectedTrigger, setSelectedTrigger] = useState("purchase")

  const triggers = {
    purchase: "Purchase Completed",
    service: "Service Completed",
    delivery: "Order Delivered",
    negative_review: "Negative Review Detected",
    no_response: "No Response After X Days",
    high_value: "High-Value Purchase",
    repeat_customer: "Repeat Customer",
  }

  const stepTypes = {
    message: { icon: MessageSquare, label: "Send Message", color: "bg-blue-100 text-blue-800" },
    condition: { icon: GitBranch, label: "Condition Check", color: "bg-purple-100 text-purple-800" },
    wait: { icon: Clock, label: "Wait Period", color: "bg-yellow-100 text-yellow-800" },
    action: { icon: Target, label: "Action", color: "bg-green-100 text-green-800" },
  }

  const addStep = (type) => {
    const newStep = {
      id: workflowSteps.length + 1,
      type,
      name: `New ${stepTypes[type].label}`,
      delay: "1h",
      message: "",
      conditions: [],
    }
    setWorkflowSteps([...workflowSteps, newStep])
  }

  const removeStep = (id) => {
    setWorkflowSteps(workflowSteps.filter((step) => step.id !== id))
  }

  const renderStepEditor = (step, index) => {
    const StepIcon = stepTypes[step.type]?.icon || MessageSquare

    return (
      <Card key={step.id} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex items-center space-x-2">
                <StepIcon className="h-4 w-4" />
                <Input
                  value={step.name}
                  onChange={() => {}}
                  className="font-medium border-none p-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={stepTypes[step.type]?.color} variant="outline">
                {stepTypes[step.type]?.label}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => removeStep(step.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.type === "message" && (
            <>
              <div className="grid gap-2">
                <Label>Message Content</Label>
                <Textarea
                  value={step.message}
                  onChange={() => {}}
                  placeholder="Enter your SMS message..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {"{name}"}, {"{business}"}, {"{review_link}"}, {"{order_number}"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Send Delay</Label>
                  <Select value={step.delay} onValueChange={() => {}}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0h">Immediately</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="3d">3 days</SelectItem>
                      <SelectItem value="7d">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Message Type</Label>
                  <Select defaultValue="review_request">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review_request">Review Request</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                      <SelectItem value="thank_you">Thank You</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {step.type === "condition" && (
            <>
              <div className="grid gap-2">
                <Label>Condition to Check</Label>
                <Select value={step.condition} onValueChange={() => {}}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_response">No Response Received</SelectItem>
                    <SelectItem value="clicked_link">Clicked Review Link</SelectItem>
                    <SelectItem value="left_review">Left a Review</SelectItem>
                    <SelectItem value="negative_sentiment">Negative Sentiment Detected</SelectItem>
                    <SelectItem value="high_rating">High Rating Given</SelectItem>
                    <SelectItem value="opted_out">Opted Out of SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>If True</Label>
                  <Select value={step.trueAction} onValueChange={() => {}}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="continue">Continue to Next Step</SelectItem>
                      <SelectItem value="skip">Skip Next Step</SelectItem>
                      <SelectItem value="end">End Workflow</SelectItem>
                      <SelectItem value="branch">Branch to Different Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>If False</Label>
                  <Select value={step.falseAction} onValueChange={() => {}}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="continue">Continue to Next Step</SelectItem>
                      <SelectItem value="skip">Skip Next Step</SelectItem>
                      <SelectItem value="end">End Workflow</SelectItem>
                      <SelectItem value="branch">Branch to Different Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {step.type === "wait" && (
            <div className="grid gap-2">
              <Label>Wait Duration</Label>
              <Select value={step.delay} onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="6h">6 hours</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="3d">3 days</SelectItem>
                  <SelectItem value="7d">1 week</SelectItem>
                  <SelectItem value="30d">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step.type === "action" && (
            <div className="grid gap-2">
              <Label>Action Type</Label>
              <Select defaultValue="tag_customer">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tag_customer">Tag Customer</SelectItem>
                  <SelectItem value="update_status">Update Customer Status</SelectItem>
                  <SelectItem value="send_notification">Send Internal Notification</SelectItem>
                  <SelectItem value="create_task">Create Follow-up Task</SelectItem>
                  <SelectItem value="add_to_list">Add to Customer List</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
        {index < workflowSteps.length - 1 && (
          <div className="flex justify-center pb-4">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workflow Configuration</CardTitle>
          <CardDescription>Set up the basic workflow settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input id="workflow-name" placeholder="e.g., Complete Review Journey" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-trigger">Trigger Event</Label>
              <Select value={selectedTrigger} onValueChange={setSelectedTrigger}>
                <SelectTrigger id="workflow-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(triggers).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea
              id="workflow-description"
              placeholder="Describe what this workflow does..."
              className="min-h-[60px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="workflow-active" />
            <Label htmlFor="workflow-active">Activate workflow immediately</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflow Steps</CardTitle>
              <CardDescription>Design your multi-step SMS sequence</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => addStep("message")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Message
              </Button>
              <Button variant="outline" size="sm" onClick={() => addStep("condition")}>
                <GitBranch className="mr-2 h-4 w-4" />
                Add Condition
              </Button>
              <Button variant="outline" size="sm" onClick={() => addStep("wait")}>
                <Clock className="mr-2 h-4 w-4" />
                Add Wait
              </Button>
              <Button variant="outline" size="sm" onClick={() => addStep("action")}>
                <Target className="mr-2 h-4 w-4" />
                Add Action
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => renderStepEditor(step, index))}

            {workflowSteps.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No steps added yet. Click the buttons above to start building your workflow.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Preview</CardTitle>
          <CardDescription>Preview how your workflow will execute</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">Execution Flow:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Trigger: {triggers[selectedTrigger]}</span>
                </div>
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-2 ml-4">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span>
                      Step {index + 1}: {step.name} (after {step.delay})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <div className="space-x-2">
                <Button variant="outline">Test Workflow</Button>
                <Button>Create Workflow</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
