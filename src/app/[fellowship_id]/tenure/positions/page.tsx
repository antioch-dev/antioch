"use client"

import { use, useState } from "react" // Add 'use' import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockPositions, mockDepartments } from "@/lib/mock-data"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Users, Edit, ToggleLeft, ToggleRight, Trash2 } from "lucide-react"

interface PositionsPageProps {
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function PositionsPage({ params }: PositionsPageProps) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [typeFilter, setTypeFilter] = useState<"all" | "standalone" | "department">("all")

  const allPositions = mockPositions.map((position) => ({
    ...position,
    department: position.departmentId ? mockDepartments.find((d) => d.id === position.departmentId) : null,
  }))

  const filteredPositions = allPositions.filter((position) => {
    const matchesSearch =
      position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (position.department?.name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && position.isActive) ||
      (statusFilter === "inactive" && !position.isActive)

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "standalone" && !position.departmentId) ||
      (typeFilter === "department" && position.departmentId)

    return matchesSearch && matchesStatus && matchesType
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Position Management</h2>
          <p className="text-muted-foreground">Manage leadership positions and roles</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${resolvedParams.fellowship_id}/leadership/departments`}> {/* Use resolvedParams */}
            <Button variant="outline">Manage Departments</Button>
          </Link>
          <Link href={`/${resolvedParams.fellowship_id}/leadership/positions/new`}> {/* Use resolvedParams */}
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Position
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search positions, descriptions, or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All Status
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                onClick={() => setStatusFilter("inactive")}
                size="sm"
              >
                Inactive
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={typeFilter === "all" ? "default" : "outline"}
                onClick={() => setTypeFilter("all")}
                size="sm"
              >
                All Types
              </Button>
              <Button
                variant={typeFilter === "standalone" ? "default" : "outline"}
                onClick={() => setTypeFilter("standalone")}
                size="sm"
              >
                Standalone
              </Button>
              <Button
                variant={typeFilter === "department" ? "default" : "outline"}
                onClick={() => setTypeFilter("department")}
                size="sm"
              >
                Department
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Positions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Positions ({filteredPositions.length})
          </CardTitle>
          <CardDescription>Leadership positions and their department assignments</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPositions.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No positions found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first leadership position"}
              </p>
              {!searchTerm && statusFilter === "all" && typeFilter === "all" && (
                <Link href={`/${resolvedParams.fellowship_id}/leadership/positions/new`}> {/* Use resolvedParams */}
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Position
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{position.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{position.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {position.department ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{position.department.name}</Badge>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No department</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={position.departmentId ? "default" : "outline"}>
                        {position.departmentId ? "Department" : "Standalone"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {position.isActive ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Badge variant={position.isActive ? "default" : "secondary"}>
                          {position.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{formatDate(position.createdAt)}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/${resolvedParams.fellowship_id}/leadership/positions/${position.id}/edit`}> {/* Use resolvedParams */}
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {position.isActive ? (
                              <>
                                <ToggleLeft className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <ToggleRight className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}