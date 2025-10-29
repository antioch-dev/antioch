"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, X, Trash2 } from "lucide-react"
import { getBlogData, saveBlogData, deleteComment } from "@/lib/storage"
import type { Comment } from "@/lib/types"

export function CommentManagement() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadComments()
  }, [])

  const loadComments = () => {
    const data = getBlogData()
    const sortedComments = data.comments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setComments(sortedComments as unknown as Comment[])
    setLoading(false)
  }

 const updateCommentStatus = (commentId: string, status: "approved" | "rejected") => {
  const data = getBlogData();
  const comments = data?.comments;
  if (!comments) return;

  const commentIndex = comments.findIndex((c) => c.id === commentId);
  if (commentIndex >= 0) {
    comments[commentIndex]!.status = status;
    saveBlogData(data);
    loadComments();
  }
};

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId)
    loadComments()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPostTitle = (postId: string) => {
    const data = getBlogData()
    const post = data.posts.find((p) => p.id === postId)
    return post?.title || "Unknown Post"
  }

  const pendingComments = comments.filter((c) => c.status === "pending")
  const approvedComments = comments.filter((c) => c.status === "approved")
  const rejectedComments = comments.filter((c) => c.status === "rejected")

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading comments...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Pending Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Pending Comments ({pendingComments.length})
            {pendingComments.length > 0 && <Badge variant="secondary">{pendingComments.length} awaiting review</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingComments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No pending comments</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{comment.authorName}</p>
                          <p className="text-sm text-muted-foreground">{comment.authorEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{getPostTitle(comment.postId)}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-xs truncate">{comment.content}</p>
                      </TableCell>
                      <TableCell>{formatDate(comment.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => updateCommentStatus(comment.id, "approved")}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => updateCommentStatus(comment.id, "rejected")}>
                            <X className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this comment? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Comments */}
      <Card>
        <CardHeader>
          <CardTitle>All Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No comments yet</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{comment.authorName}</p>
                          <p className="text-sm text-muted-foreground">{comment.authorEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{getPostTitle(comment.postId)}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-xs truncate">{comment.content}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            comment.status === "approved"
                              ? "default"
                              : comment.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {comment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(comment.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {comment.status !== "approved" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateCommentStatus(comment.id, "approved")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          {comment.status !== "rejected" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateCommentStatus(comment.id, "rejected")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this comment? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
