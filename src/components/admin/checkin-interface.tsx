"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle, Clock, Users, UserCheck, UserX, Filter } from "lucide-react"
import type { Registration } from "@/lib/mock-data"

interface CheckinInterfaceProps {
  registrations: Registration[]
  onCheckIn: (registrationId: string) => void
  onCheckOut: (registrationId: string) => void
}

export function CheckinInterface({ registrations, onCheckIn, onCheckOut }: CheckinInterfaceProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "checked-in" && reg.checkedIn) ||
      (statusFilter === "not-checked-in" && !reg.checkedIn)

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: registrations.length,
    checkedIn: registrations.filter((reg) => reg.checkedIn).length,
    notCheckedIn: registrations.filter((reg) => !reg.checkedIn).length,
  }

  const attendanceRate = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards - Tablet Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Total Registered</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.checkedIn}</div>
            <div className="text-sm text-green-600 dark:text-green-400">Checked In</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.notCheckedIn}</div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Not Checked In</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4 text-center">
            <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{attendanceRate}%</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Attendance Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter - Tablet Optimized */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-4 text-lg bg-white dark:bg-gray-800"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-64 py-4 text-lg bg-white dark:bg-gray-800">
            <Filter className="w-5 h-5 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({stats.total})</SelectItem>
            <SelectItem value="checked-in">Checked In ({stats.checkedIn})</SelectItem>
            <SelectItem value="not-checked-in">Not Checked In ({stats.notCheckedIn})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Registration List - Tablet Optimized */}
      <div className="space-y-3">
        {filteredRegistrations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No registrations found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No approved registrations for this event."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRegistrations.map((registration) => (
            <Card
              key={registration.id}
              className={`transition-all duration-200 ${
                registration.checkedIn
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{registration.memberName}</h3>
                      {registration.checkedIn ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Checked In
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          Not Checked In
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-gray-600 dark:text-gray-300">
                      <div className="text-lg">{registration.email}</div>
                      <div className="text-lg">{registration.phone}</div>
                      {registration.notes && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <strong>Notes:</strong> {registration.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-6">
                    {registration.checkedIn ? (
                      <Button
                        onClick={() => onCheckOut(registration.id)}
                        variant="outline"
                        size="lg"
                        className="min-w-32 py-4 text-lg bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                      >
                        <UserX className="w-5 h-5 mr-2" />
                        Check Out
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onCheckIn(registration.id)}
                        size="lg"
                        className="min-w-32 py-4 text-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        <UserCheck className="w-5 h-5 mr-2" />
                        Check In
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Real-time Updates Indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Real-time updates active</span>
        </div>
      </div>
    </div>
  )
}
