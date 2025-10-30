"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
// import { Header } from "@/components/layout/header"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { PostManagement } from "@/components/admin/post-management"
import { CommentManagement } from "@/components/admin/comment-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  return (
    // <ProtectedRoute>
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your fellowship blog posts and comments</p>
          </div>

          <div className="mb-8">
            <DashboardStats />
          </div>

          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <PostManagement />
            </TabsContent>

            <TabsContent value="comments">
              <CommentManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      </>
    // </ProtectedRoute>
  )
}
