import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Phone, Mail, BookOpen, Shield } from "lucide-react"
import Link from "next/link"

export default function VolunteersPage() {
  const volunteerRoles = [
    {
      role: "Greeters",
      description: "Collect visitor information and provide warm welcome",
      volunteers: 12,
      needed: 15,
      training: "Basic hospitality training",
      nextTraining: "Jan 25, 2024",
    },
    {
      role: "Follow-Up Team",
      description: "Make calls and write personal notes to visitors",
      volunteers: 8,
      needed: 12,
      training: "Communication skills & confidentiality",
      nextTraining: "Jan 30, 2024",
    },
    {
      role: "Discipleship Coaches",
      description: "Mentor new believers in their faith journey",
      volunteers: 15,
      needed: 20,
      training: "Discipleship principles & mentoring",
      nextTraining: "Feb 5, 2024",
    },
    {
      role: "Event Coordinators",
      description: "Plan and execute evangelism events",
      volunteers: 6,
      needed: 8,
      training: "Event planning & logistics",
      nextTraining: "Feb 10, 2024",
    },
  ]

  const volunteers = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      phone: "(555) 123-4567",
      roles: ["Greeter", "Follow-Up Team"],
      joinDate: "2023-06-15",
      trainingStatus: "Complete",
      availability: "Sundays, Wednesdays",
      contacts: 45,
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "(555) 234-5678",
      roles: ["Discipleship Coach"],
      joinDate: "2023-08-20",
      trainingStatus: "In Progress",
      availability: "Weekends",
      contacts: 12,
    },
    {
      id: 3,
      name: "Lisa Davis",
      email: "lisa.d@email.com",
      phone: "(555) 345-6789",
      roles: ["Event Coordinator", "Follow-Up Team"],
      joinDate: "2023-04-10",
      trainingStatus: "Complete",
      availability: "Flexible",
      contacts: 78,
    },
    {
      id: 4,
      name: "John Smith",
      email: "john.s@email.com",
      phone: "(555) 456-7890",
      roles: ["Greeter"],
      joinDate: "2024-01-05",
      trainingStatus: "Scheduled",
      availability: "Sundays",
      contacts: 3,
    },
  ]

  const trainingModules = [
    {
      module: "Evangelism Conversations",
      description: "Role-playing gospel conversations and objection handling",
      duration: "2 hours",
      participants: 25,
      nextSession: "Jan 22, 2024",
    },
    {
      module: "Confidentiality & Boundaries",
      description: "Guidelines for handling sensitive visitor information",
      duration: "1 hour",
      participants: 18,
      nextSession: "Jan 28, 2024",
    },
    {
      module: "Discipleship Principles",
      description: "Biblical foundations for mentoring new believers",
      duration: "3 hours",
      participants: 15,
      nextSession: "Feb 5, 2024",
    },
    {
      module: "Digital Outreach Tools",
      description: "Using social media and technology for evangelism",
      duration: "1.5 hours",
      participants: 12,
      nextSession: "Feb 12, 2024",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Volunteer Management</h1>
              <p className="text-gray-600">Mobilize and train your evangelism team</p>
            </div>
            <Link href="/volunteers/add">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="roles">Volunteer Roles</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteer Directory</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {volunteerRoles.map((role, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{role.role}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                      <Badge variant="outline">
                        {role.volunteers}/{role.needed}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Volunteer Coverage</span>
                          <span>{Math.round((role.volunteers / role.needed) * 100)}%</span>
                        </div>
                        <Progress value={(role.volunteers / role.needed) * 100} className="h-2" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Training Required:</strong> {role.training}
                        </p>
                        <p>
                          <strong>Next Training:</strong> {role.nextTraining}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Volunteers
                        </Button>
                        <Button size="sm">Recruit More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Directory</CardTitle>
                <CardDescription>Manage your evangelism team members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Training Status</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Contacts Made</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {volunteers.map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{volunteer.name}</p>
                            <p className="text-sm text-gray-500">Joined: {volunteer.joinDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {volunteer.email}
                            </p>
                            <p className="text-sm flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {volunteer.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {volunteer.roles.map((role, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              volunteer.trainingStatus === "Complete"
                                ? "default"
                                : volunteer.trainingStatus === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {volunteer.trainingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{volunteer.availability}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {volunteer.contacts}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              Schedule
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Modules</CardTitle>
                <CardDescription>Equip volunteers with necessary skills and knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingModules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{module.module}</p>
                          <p className="text-sm text-gray-600">{module.description}</p>
                          <p className="text-xs text-gray-500">
                            Duration: {module.duration} • {module.participants} participants
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">Next Session</p>
                          <p className="text-xs text-gray-500">{module.nextSession}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Training Module
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Training Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Training Guidelines</CardTitle>
                <CardDescription>Key principles for volunteer development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Confidentiality & Boundaries
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Respect visitor privacy and personal information</li>
                      <li>• Maintain appropriate professional boundaries</li>
                      <li>• Follow up within designated timeframes</li>
                      <li>• Report concerns to leadership immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Evangelism Best Practices
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Listen actively and ask thoughtful questions</li>
                      <li>• Share personal testimony when appropriate</li>
                      <li>• Use conversation guides and tools effectively</li>
                      <li>• Follow up with prayer and continued relationship</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
