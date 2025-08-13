import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SentimentTable() {
  const sentimentData = [
    {
      id: 1,
      topic: "Customer Service",
      sentiment: "Positive",
      excerpt: "The staff was incredibly helpful and went above and beyond to solve my issue.",
      source: "Google Review",
      date: "Aug 5, 2025",
    },
    {
      id: 2,
      topic: "Product Quality",
      sentiment: "Positive",
      excerpt: "The product exceeded my expectations in terms of quality and durability.",
      source: "Feedback Form",
      date: "Aug 3, 2025",
    },
    {
      id: 3,
      topic: "Wait Times",
      sentiment: "Negative",
      excerpt: "I had to wait over 30 minutes before anyone helped me.",
      source: "Yelp Review",
      date: "Aug 2, 2025",
    },
    {
      id: 4,
      topic: "Website",
      sentiment: "Neutral",
      excerpt: "The website is functional but could use some improvements in navigation.",
      source: "Feedback Form",
      date: "Aug 1, 2025",
    },
    {
      id: 5,
      topic: "Shipping",
      sentiment: "Negative",
      excerpt: "My package arrived damaged and later than the estimated delivery date.",
      source: "Facebook Review",
      date: "Jul 30, 2025",
    },
  ]

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-100 text-green-800"
      case "Neutral":
        return "bg-blue-100 text-blue-800"
      case "Negative":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Topic</TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead className="hidden md:table-cell">Excerpt</TableHead>
          <TableHead>Source</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sentimentData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.topic}</TableCell>
            <TableCell>
              <Badge className={getSentimentColor(item.sentiment)} variant="outline">
                {item.sentiment}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell max-w-xs truncate">{item.excerpt}</TableCell>
            <TableCell>{item.source}</TableCell>
            <TableCell className="hidden sm:table-cell">{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
