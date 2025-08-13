"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SMSCampaignList } from "@/components/sms-campaign-list"
import { SMSAnalytics } from "@/components/sms-analytics"
import { CustomerList } from "@/components/customer-list"
import { Plus, MessageSquare, Send, Users, BarChart3 } from "lucide-react"
import { SMSWorkflows } from "@/components/sms-workflows"

export default function SMSCampaignsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("follow-up")

  const templates = {
    "follow-up": {
      name: "Review Follow-up",
      message:
        "Hi {name}! Thanks for choosing {business}. We'd love to hear about your experience. Please leave us a review: {review_link}. Reply STOP to opt out.",
    },
    "thank-you": {
      name: "Thank You",
      message:
        "Thank you {name} for your recent purchase from {business}! Your feedback matters to us. Share your experience: {review_link}",
    },
    reminder: {
      name: "Review Reminder",
      message:
        "Hi {name}, we noticed you haven't left a review yet. Your opinion helps other customers. Leave a review: {review_link}",
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">SMS Review Campaigns</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 scheduled, 1 running</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews Generated</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">298</div>
              <p className="text-xs text-muted-foreground">+22% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="customers">Customer List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SMS Campaigns</CardTitle>
                <CardDescription>Manage your review follow-up campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <SMSCampaignList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Setup</CardTitle>
                  <CardDescription>Configure your SMS review campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="e.g., Post-Purchase Review Request" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="campaign-trigger">Trigger Event</Label>
                    <Select defaultValue="purchase">
                      <SelectTrigger id="campaign-trigger">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">After Purchase</SelectItem>
                        <SelectItem value="service">After Service</SelectItem>
                        <SelectItem value="delivery">After Delivery</SelectItem>
                        <SelectItem value="manual">Manual Send</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="delay">Send Delay</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger id="delay">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediately</SelectItem>
                        <SelectItem value="1h">1 hour later</SelectItem>
                        <SelectItem value="24h">24 hours later</SelectItem>
                        <SelectItem value="3d">3 days later</SelectItem>
                        <SelectItem value="7d">1 week later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="template">Message Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger id="template">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="follow-up">Review Follow-up</SelectItem>
                        <SelectItem value="thank-you">Thank You</SelectItem>
                        <SelectItem value="reminder">Review Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="review-platform">Review Platform</Label>
                    <Select defaultValue="google">
                      <SelectTrigger id="review-platform">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Reviews</SelectItem>
                        <SelectItem value="yelp">Yelp</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="custom">Custom Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="campaign-active" defaultChecked />
                    <Label htmlFor="campaign-active">Activate campaign immediately</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Message Preview</CardTitle>
                  <CardDescription>Preview how your SMS will look to customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="message-content">Message Content</Label>
                    <Textarea
                      id="message-content"
                      className="min-h-[120px]"
                      value={templates[selectedTemplate]?.message || ""}
                      onChange={() => {}}
                    />
                    <p className="text-xs text-muted-foreground">
                      Available variables: {"{name}"}, {"{business}"}, {"{review_link}"}, {"{order_number}"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="rounded-lg border bg-muted/20 p-4">
                      <div className="flex items-start space-x-2">
                        <div className="rounded-full bg-primary p-2">
                          <MessageSquare className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                            <p className="text-sm">
                              Hi John Smith! Thanks for choosing Acme Store. We'd love to hear about your experience.
                              Please leave us a review: https://g.page/r/... Reply STOP to opt out.
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">Character count: 142/160 | Cost: $0.02</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Compliance Check</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Includes opt-out instructions</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Under 160 characters</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Business name included</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Create Campaign</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>SMS Workflows</CardTitle>
                    <CardDescription>
                      Create automated multi-step SMS sequences based on customer behavior
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Workflow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <SMSWorkflows />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Database</CardTitle>
                <CardDescription>Manage customers eligible for SMS campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SMS Campaign Analytics</CardTitle>
                <CardDescription>Track the performance of your SMS review campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <SMSAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
                <CardDescription>Configure your SMS campaign settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="sender-name">Sender Name</Label>
                  <Input id="sender-name" defaultValue="Acme Store" maxLength={11} />
                  <p className="text-xs text-muted-foreground">Maximum 11 characters for sender ID</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="business-phone">Business Phone Number</Label>
                  <Input id="business-phone" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="review-url">Default Review URL</Label>
                  <Input id="review-url" defaultValue="https://g.page/r/your-business-id/review" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive SMS notifications for campaign updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Retry Failed Messages</Label>
                      <p className="text-xs text-muted-foreground">Automatically retry failed SMS deliveries</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Respect Do Not Disturb Hours</Label>
                      <p className="text-xs text-muted-foreground">Don't send messages between 9 PM and 8 AM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="daily-limit">Daily Message Limit</Label>
                  <Select defaultValue="500">
                    <SelectTrigger id="daily-limit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 messages/day</SelectItem>
                      <SelectItem value="500">500 messages/day</SelectItem>
                      <SelectItem value="1000">1,000 messages/day</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
