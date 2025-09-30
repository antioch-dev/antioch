import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, UserPlus, Phone, Mail, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function VisitorsPage() {
  const visitors = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      visitDate: "2024-01-15",
      status: "New Visitor",
      followUpStage: "Day 1-3",
      interests: ["Small Groups", "Baptism"],
      address: "123 Main St, City, ST 12345",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "(555) 234-5678",
      visitDate: "2024-01-10",
      status: "New Believer",
      followUpStage: "Week 1-2",
      interests: ["Discipleship", "Serving"],
      address: "456 Oak Ave, City, ST 12345",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.r@email.com",
      phone: "(555) 345-6789",
      visitDate: "2024-01-05",
      status: "Active Member",
      followUpStage: "Month 1-3",
      interests: ["Leadership", "Missions"],
      address: "789 Pine Rd, City, ST 12345",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "(555) 456-7890",
      visitDate: "2024-01-12",
      status: "Inactive Member",
      followUpStage: "Re-engagement",
      interests: ["Worship", "Youth Ministry"],
      address: "321 Elm St, City, ST 12345",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Visitor Management</h1>
              <p className="text-gray-600">Track and nurture relationships with visitors and members</p>
            </div>
            <Link href="/visitors/add">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Visitor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search visitors by name, email, or phone..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new-visitor">New Visitor</SelectItem>
                  <SelectItem value="new-believer">New Believer</SelectItem>
                  <SelectItem value="active-member">Active Member</SelectItem>
                  <SelectItem value="inactive-member">Inactive Member</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Follow-up Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="day-1-3">Day 1-3</SelectItem>
                  <SelectItem value="week-1-2">Week 1-2</SelectItem>
                  <SelectItem value="month-1-3">Month 1-3</SelectItem>
                  <SelectItem value="re-engagement">Re-engagement</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visitors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Visitors & Members</CardTitle>
            <CardDescription>Manage your church community relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Follow-up Stage</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{visitor.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {visitor.address.split(",")[0]}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {visitor.email}
                        </p>
                        <p className="text-sm flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {visitor.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {visitor.visitDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          visitor.status === "New Visitor"
                            ? "default"
                            : visitor.status === "New Believer"
                              ? "secondary"
                              : visitor.status === "Active Member"
                                ? "default"
                                : "outline"
                        }
                      >
                        {visitor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{visitor.followUpStage}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {visitor.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Follow-up</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
