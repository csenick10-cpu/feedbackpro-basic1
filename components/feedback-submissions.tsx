import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Eye, Flag, CheckCircle } from "lucide-react"

export function FeedbackSubmissions() {
  const submissions = [
    {
      id: 1,
      form: "General Feedback",
      name: "John Smith",
      email: "john.smith@example.com",
      rating: 4,
      feedback: "The website is very user-friendly, but I had some trouble finding the contact information.",
      date: "Aug 8, 2025",
      status: "New",
    },
    {
      id: 2,
      form: "Product Feedback",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      rating: 2,
      feedback: "The product quality was not what I expected based on the description online.",
      date: "Aug 7, 2025",
      status: "Flagged",
    },
    {
      id: 3,
      form: "General Feedback",
      name: "Michael Brown",
      email: "mbrown@example.com",
      rating: 5,
      feedback: "Absolutely fantastic service! Everything exceeded my expectations.",
      date: "Aug 6, 2025",
      status: "Reviewed",
    },
    {
      id: 4,
      form: "Product Feedback",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      rating: 3,
      feedback: "The product works as expected, but the instructions could be clearer.",
      date: "Aug 5, 2025",
      status: "New",
    },
    {
      id: 5,
      form: "General Feedback",
      name: "David Wilson",
      email: "dwilson@example.com",
      rating: 1,
      feedback: "I had a terrible experience with customer service. No one responded to my emails.",
      date: "Aug 4, 2025",
      status: "Reviewed",
    },
  ]

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return (
          <Badge className="bg-blue-100 text-blue-800" variant="outline">
            New
          </Badge>
        )
      case "Flagged":
        return (
          <Badge className="bg-red-100 text-red-800" variant="outline">
            Flagged
          </Badge>
        )
      case "Reviewed":
        return (
          <Badge className="bg-green-100 text-green-800" variant="outline">
            Reviewed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Form</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Rating</TableHead>
          <TableHead className="hidden lg:table-cell">Feedback</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell className="font-medium">{submission.form}</TableCell>
            <TableCell>{submission.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex">{renderStars(submission.rating)}</div>
            </TableCell>
            <TableCell className="hidden lg:table-cell max-w-xs truncate">{submission.feedback}</TableCell>
            <TableCell className="hidden sm:table-cell">{submission.date}</TableCell>
            <TableCell>{getStatusBadge(submission.status)}</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Flag className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
