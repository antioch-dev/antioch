"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockTenures } from "@/lib/mock-data"
import type { Tenure } from "@/lib/types"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Calendar, Edit, Archive, Trash2 } from "lucide-react"

interface TenuresPageProps {
  params: { fellowship_id: string }
}

export default function TenuresPage({ params }: TenuresPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "past" | "upcoming">("all")

  // Use mock data for tenures
  const allTenures = mockTenures

  const filteredTenures = allTenures.filter((tenure) => {
    const matchesSearch = tenure.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tenure.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: Tenure["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "past":
        return "secondary"
      case "upcoming":
        return "outline"
      default:
        return "secondary"
    }
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
          <h2 className="text-2xl font-bold text-foreground">Tenure Management</h2>
          <p className="text-muted-foreground">Manage leadership tenure periods</p>
        </div>
        <Link href={`/${params.fellowship_id}/leadership/tenures/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Tenure
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Tenures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tenures..."
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
                All
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "past" ? "default" : "outline"}
                onClick={() => setStatusFilter("past")}
                size="sm"
              >
                Past
              </Button>
              <Button
                variant={statusFilter === "upcoming" ? "default" : "outline"}
                onClick={() => setStatusFilter("upcoming")}
                size="sm"
              >
                Upcoming
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenures Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tenures ({filteredTenures.length})
          </CardTitle>
          <CardDescription>
            {statusFilter === "all"
              ? "All leadership tenure periods"
              : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} tenure periods`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTenures.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tenures found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first tenure period"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link href={`/${params.fellowship_id}/leadership/tenures/new`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Tenure
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenures.map((tenure) => {
                  const startDate = new Date(tenure.startDate)
                  const endDate = new Date(tenure.endDate)
                  const durationMonths = Math.round(
                    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30),
                  )

                  return (
                    <TableRow key={tenure.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{tenure.title}</div>
                          <div className="text-sm text-muted-foreground">Created {formatDate(tenure.createdAt)}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(tenure.startDate)}</TableCell>
                      <TableCell>{formatDate(tenure.endDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(tenure.status)}>
                          {tenure.status.charAt(0).toUpperCase() + tenure.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{durationMonths} months</span>
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
                              <Link href={`/${params.fellowship_id}/leadership/tenures/${tenure.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
