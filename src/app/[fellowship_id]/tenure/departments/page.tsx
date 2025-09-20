"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getDepartments, getPositionsWithDepartments } from "@/lib/data-utils"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Building2, Edit, Trash2, Users } from "lucide-react"

interface DepartmentsPageProps {
  params: { fellowship_id: string }
}

export default function DepartmentsPage({ params }: DepartmentsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const allDepartments = getDepartments(params.fellowship_id)
  const allPositions = getPositionsWithDepartments(params.fellowship_id)

  const filteredDepartments = allDepartments.filter((department) => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getDepartmentPositionCount = (departmentId: string) => {
    return allPositions.filter((p) => p.departmentId === departmentId && p.isActive).length
  }

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
          <h2 className="text-2xl font-bold text-foreground">Department Management</h2>
          <p className="text-muted-foreground">Manage ministry departments and their structure</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${params.fellowship_id}/leadership/positions`}>
            <Button variant="outline">Manage Positions</Button>
          </Link>
          <Link href={`/${params.fellowship_id}/leadership/departments/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Department
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No departments found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by creating your first ministry department"}
                </p>
                {!searchTerm && (
                  <Link href={`/${params.fellowship_id}/leadership/departments/new`}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Department
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredDepartments.map((department) => {
            const positionCount = getDepartmentPositionCount(department.id)

            return (
              <Card key={department.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{department.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/${params.fellowship_id}/leadership/departments/${department.id}/members`}>
                            <Users className="h-4 w-4 mr-2" />
                            Manage Members
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/${params.fellowship_id}/leadership/departments/${department.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">{department.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Positions</span>
                      <Badge variant={positionCount > 0 ? "default" : "secondary"}>
                        {positionCount} position{positionCount !== 1 ? "s" : ""}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm text-foreground">{formatDate(department.createdAt)}</span>
                    </div>

                    {positionCount > 0 && (
                      <div className="pt-2 border-t">
                        <Link href={`/${params.fellowship_id}/leadership/positions?department=${department.id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Users className="h-4 w-4 mr-2" />
                            View Positions
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Summary Stats */}
      {filteredDepartments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{filteredDepartments.length}</div>
                <div className="text-sm text-muted-foreground">Total Departments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {filteredDepartments.reduce((sum, dept) => sum + getDepartmentPositionCount(dept.id), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Positions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {filteredDepartments.filter((dept) => getDepartmentPositionCount(dept.id) > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Departments</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
