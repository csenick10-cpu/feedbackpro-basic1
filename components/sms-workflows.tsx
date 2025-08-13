"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowBuilder } from "@/components/workflow-builder"
import { WorkflowAnalytics } from "@/components/workflow-analytics"
import { Play, Pause, Edit, Copy, Trash, BarChart3, MessageSquare, Clock } from "lucide-react"

export function SMSWorkflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  const workflows = [
    {
      id: 1,
      name: "Complete Review Journey",
      description: "Multi-step sequence to maximize review completion",
      status: "Active",
      trigger: "Purchase Completed",
      steps: 5,
      customers: 342,
      completionRate: 68,
      reviewRate: 45,
      created: "Aug 1, 2025",
      lastModified: "Aug 8, 2025",
      performance: {
        step1: { sent: 342, opened: 298, clicked: 156 },
        step2: { sent: 186, opened: 142, clicked: 89 },
        step3: { sent: 97, opened: 73, clicked: 45 },
        step4: { sent: 52, opened: 38, clicked: 28 },
        step5: { sent: 24, opened: 18, clicked: 15 },
      },
    },
    {
      id: 2,
      name: "Service Recovery Workflow",
      description: "Targeted sequence for customers who left negative feedback",
      status: "Active",
      trigger: "Negative Review Detected",
      steps: 3,
      customers: 23,
      completionRate: 87,
      reviewRate: 52,
      created: "Jul 15, 2025",
      lastModified: "Aug 5, 2025",
      performance: {
        step1: { sent: 23, opened: 21, clicked: 18 },
        step2: { sent: 18, opened: 16, clicked: 14 },
        step3: { sent: 14, opened: 12, clicked: 10 },
      },
    },
    {
      id: 3,
      name: "VIP Customer Engagement",
      description: "Premium experience for high-value customers",
      status: "Draft",
      trigger: "High-Value Purchase",
      steps: 4,
      customers: 0,
      completionRate: 0,
      reviewRate: 0,
      created: "Aug 10, 2025",
      lastModified: "Aug 10, 2025",
      performance: {},
    },
    {
      id: 4,
      name: "Win-Back Campaign",
      description: "Re-engage customers who haven't responded to initial requests",
      status: "Paused",
      trigger: "No Response After 7 Days",
      steps: 3,
      customers: 156,
      completionRate: 34,
      reviewRate: 18,
      created: "Jul 28, 2025",
      lastModified: "Aug 3, 2025",
      performance: {
        step1: { sent: 156, opened: 98, clicked: 42 },
        step2: { sent: 114, opened: 67, clicked: 28 },
        step3: { sent: 86, opened: 45, clicked: 18 },
      },
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800" variant="outline">
            Active
          </Badge>
        )
      case "Paused":
        return (
          <Badge className="bg-yellow-100 text-yellow-800" variant="outline">
            Paused
          </Badge>
        )
      case "Draft":
        return (
          <Badge className="bg-gray-100 text-gray-800" variant="outline">
            Draft
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Workflow List</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </div>
                    {getStatusBadge(workflow.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Trigger:</span>
                        </div>
                        <div className="font-medium">{workflow.trigger}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Steps:</span>
                        </div>
                        <div className="font-medium">{workflow.steps} steps</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{workflow.customers}</div>
                        <div className="text-muted-foreground">Customers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{workflow.completionRate}%</div>
                        <div className="text-muted-foreground">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{workflow.reviewRate}%</div>
                        <div className="text-muted-foreground">Review Rate</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-xs text-muted-foreground">Modified {workflow.lastModified}</div>
                      <div className="flex space-x-1">
                        {workflow.status === "Active" ? (
                          <Button variant="ghost" size="icon" title="Pause Workflow">
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" title="Start Workflow">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Edit Workflow">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Duplicate Workflow">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="View Analytics">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete Workflow">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Builder</CardTitle>
              <CardDescription>Create and customize multi-step SMS workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowBuilder />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance Analytics</CardTitle>
              <CardDescription>Analyze the performance of your SMS workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowAnalytics workflows={workflows} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
