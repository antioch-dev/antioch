"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Copy, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { getAllQuestionGroups } from "@/lib/data"
import { toast } from "@/components/ui/use-toast"

export function QuestionGroupList() {
  const [searchTerm, setSearchTerm] = useState("")
  const questionGroups = getAllQuestionGroups()

  const filteredGroups = questionGroups.filter((group) => group.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const copyToClipboard = async (url: string) => {
   await navigator.clipboard.writeText(`${window.location.origin}${url}`)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    })
  }

  const getStatus = (group: { startDate?: string; endDate?: string }) => {
    const now = new Date()
    if (group.endDate && new Date(group.endDate) < now) {
      return "Closed"
    }
    if (group.startDate && new Date(group.startDate) > now) {
      return "Scheduled"
    }
    return "Active"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questionnaires..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9"
        />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No questionnaires found. Create your first one!
                  </TableCell>
                </TableRow>
              ) : (
                filteredGroups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/questionnaire/${group.id}`} className="hover:underline">
                        {group.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          getStatus(group) === "Active"
                            ? "default"
                            : getStatus(group) === "Closed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {getStatus(group)}
                      </Badge>
                    </TableCell>
                    <TableCell>{group.questions.length}</TableCell>
                    <TableCell>{group.responses?.length || 0}</TableCell>
                    <TableCell>{new Date(group.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(`/answer/${group.answererUrl}`)}
                          title="Copy shareable link"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy link</span>
                        </Button>
                        <Button variant="ghost" size="icon" asChild title="View analytics">
                          <Link href={`/dashboard/questionnaire/${group.id}?tab=analytics`}>
                            <BarChart3 className="h-4 w-4" />
                            <span className="sr-only">View analytics</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild title="Open answerer view">
                          <Link href={`/answer/${group.answererUrl}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Open answerer view</span>
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
