import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Pause, Edit, Trash, BarChart3 } from "lucide-react"

export function SMSCampaignList() {
  const campaigns = [
    {
      id: 1,
      name: "Post-Purchase Review Request",
      status: "Active",
      trigger: "After Purchase",
      delay: "24 hours",
      sent: 342,
      responses: 82,
      reviews: 67,
      created: "Aug 1, 2025",
      lastSent: "2 hours ago",
    },
    {
      id: 2,
      name: "Service Follow-up",
      status: "Active",
      trigger: "After Service",
      delay: "3 days",
      sent: 156,
      responses: 38,
      reviews: 29,
      created: "Jul 15, 2025",
      lastSent: "5 hours ago",
    },
    {
      id: 3,
      name: "Delivery Confirmation Review",
      status: "Paused",
      trigger: "After Delivery",
      delay: "1 day",
      sent: 89,
      responses: 21,
      reviews: 18,
      created: "Jul 28, 2025",
      lastSent: "3 days ago",
    },
    {
      id: 4,
      name: "Review Reminder",
      status: "Draft",
      trigger: "Manual",
      delay: "Immediate",
      sent: 0,
      responses: 0,
      reviews: 0,
      created: "Aug 5, 2025",
      lastSent: "Never",
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

  const getResponseRate = (sent, responses) => {
    if (sent === 0) return "0%"
    return `${Math.round((responses / sent) * 100)}%`
  }

  const getConversionRate = (sent, reviews) => {
    if (sent === 0) return "0%"
    return `${Math.round((reviews / sent) * 100)}%`
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Trigger</TableHead>
            <TableHead className="hidden lg:table-cell">Messages Sent</TableHead>
            <TableHead className="hidden lg:table-cell">Response Rate</TableHead>
            <TableHead className="hidden xl:table-cell">Reviews Generated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Created {campaign.created} • Last sent {campaign.lastSent}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(campaign.status)}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div>
                  <div className="text-sm">{campaign.trigger}</div>
                  <div className="text-xs text-muted-foreground">Delay: {campaign.delay}</div>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="text-sm font-medium">{campaign.sent.toLocaleString()}</div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div>
                  <div className="text-sm font-medium">{getResponseRate(campaign.sent, campaign.responses)}</div>
                  <div className="text-xs text-muted-foreground">{campaign.responses} responses</div>
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <div>
                  <div className="text-sm font-medium">{getConversionRate(campaign.sent, campaign.reviews)}</div>
                  <div className="text-xs text-muted-foreground">{campaign.reviews} reviews</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {campaign.status === "Active" ? (
                    <Button variant="ghost" size="icon" title="Pause Campaign">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" title="Start Campaign">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" title="Edit Campaign">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="View Analytics">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Delete Campaign">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
