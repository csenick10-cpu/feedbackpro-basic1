import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Upload, Download, UserPlus, Search } from "lucide-react"

export function CustomerList() {
  const customers = [
    {
      id: 1,
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      lastPurchase: "Aug 8, 2025",
      smsConsent: true,
      campaignsSent: 2,
      reviewsLeft: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      email: "sarah.j@example.com",
      lastPurchase: "Aug 6, 2025",
      smsConsent: true,
      campaignsSent: 1,
      reviewsLeft: 0,
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Brown",
      phone: "+1 (555) 345-6789",
      email: "mbrown@example.com",
      lastPurchase: "Aug 4, 2025",
      smsConsent: false,
      campaignsSent: 0,
      reviewsLeft: 1,
      status: "Opted Out",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "+1 (555) 456-7890",
      email: "emily.davis@example.com",
      lastPurchase: "Aug 2, 2025",
      smsConsent: true,
      campaignsSent: 3,
      reviewsLeft: 2,
      status: "Active",
    },
    {
      id: 5,
      name: "David Wilson",
      phone: "+1 (555) 567-8901",
      email: "dwilson@example.com",
      lastPurchase: "Jul 30, 2025",
      smsConsent: true,
      campaignsSent: 1,
      reviewsLeft: 0,
      status: "Active",
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
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800" variant="outline">
            Pending
          </Badge>
        )
      case "Opted Out":
        return (
          <Badge className="bg-red-100 text-red-800" variant="outline">
            Opted Out
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-8 w-[300px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="opted-out">Opted Out</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Consent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="consented">SMS Consent</SelectItem>
              <SelectItem value="no-consent">No Consent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Last Purchase</TableHead>
            <TableHead>SMS Consent</TableHead>
            <TableHead className="hidden xl:table-cell">Campaigns Sent</TableHead>
            <TableHead className="hidden xl:table-cell">Reviews Left</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground md:hidden">{customer.phone}</div>
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
              <TableCell className="hidden lg:table-cell">{customer.lastPurchase}</TableCell>
              <TableCell>
                {customer.smsConsent ? (
                  <Badge className="bg-green-100 text-green-800" variant="outline">
                    Yes
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800" variant="outline">
                    No
                  </Badge>
                )}
              </TableCell>
              <TableCell className="hidden xl:table-cell">{customer.campaignsSent}</TableCell>
              <TableCell className="hidden xl:table-cell">{customer.reviewsLeft}</TableCell>
              <TableCell>{getStatusBadge(customer.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" title="Send SMS" disabled={!customer.smsConsent}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing 5 of 1,247 customers</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
