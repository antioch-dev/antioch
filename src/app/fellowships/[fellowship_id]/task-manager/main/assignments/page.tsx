"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, ArrowRight, UserPlus, ArrowLeft } from "lucide-react" 
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation" 
import { toast } from "sonner"

export default function AssignmentsPage() {
  const { tasks, teamMembers, assignTask, updateTeamMember } = useStore()
  const router = useRouter() 
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedTaskForAssignment, setSelectedTaskForAssignment] = useState<string | null>(null)
  const [selectedMemberForAssignment, setSelectedMemberForAssignment] = useState<string>("")

  const unassignedTasks = tasks.filter((task:any) => !task.assignee_id)
  const selectedMemberData = teamMembers.find((m:any) => m.id === selectedMember)
  const memberTasks = selectedMember ? tasks.filter((task:any) => task.assignee_id === selectedMember) : []

  const handleAssignTask = () => {
    if (selectedTaskForAssignment && selectedMemberForAssignment) {
      assignTask(selectedTaskForAssignment, selectedMemberForAssignment)
      toast.success("Task assigned successfully!")
      setAssignDialogOpen(false)
      setSelectedTaskForAssignment(null)
      setSelectedMemberForAssignment("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Assignments</h1>
          <p className="text-gray-400 mt-2">Manage task assignments and team workload</p>
        </div>
        <div className="flex items-center space-x-4"> {/* Added a div to group buttons */}
          <Button 
            onClick={() => router.back()} // Go Back button
            variant="outline" 
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <span className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Assign Task
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Assign Task to Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium">Select Task</label>
                  <Select value={selectedTaskForAssignment || ""} onValueChange={setSelectedTaskForAssignment}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Choose a task to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {unassignedTasks.map((task: any) => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium">Select Team Member</label>
                  <Select value={selectedMemberForAssignment} onValueChange={setSelectedMemberForAssignment}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Choose team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member:any) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center">
                            <Avatar className="w-6 h-6 mr-2">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n:any) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {member.name} - {member.role}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAssignTask} className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign Task
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      ---

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member:any) => (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedMember === member.id
                      ? "bg-blue-600/20 border-blue-500"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n:any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-medium">{member.name}</h3>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {member.tasksCompleted}/{member.tasksAssigned} tasks
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={member.workload} className="w-20" />
                        <span className="text-xs text-gray-400">{member.workload}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Member Tasks */}
          {selectedMemberData && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{selectedMemberData.name}'s Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {memberTasks.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No tasks assigned</p>
                ) : (
                  memberTasks.map((task:any) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-gray-700 rounded-lg border border-gray-600"
                    >
                      <h4 className="text-white font-medium text-sm mb-1">{task.title}</h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {task.priority}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            task.status === "completed"
                              ? "bg-green-600"
                              : task.status === "in_progress"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                          }`}
                        >
                          {task.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Unassigned Tasks */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Unassigned Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {unassignedTasks.length === 0 ? (
                <p className="text-gray-400 text-center py-4">All tasks are assigned!</p>
              ) : (
                unassignedTasks.map((task:any) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 cursor-pointer"
                  >
                    <h4 className="text-white font-medium text-sm mb-1">{task.title}</h4>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Assignment Stats */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Assignment Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Tasks</span>
                <span className="text-white font-medium">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Assigned</span>
                <span className="text-white font-medium">{tasks.length - unassignedTasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unassigned</span>
                <span className="text-white font-medium">{unassignedTasks.length}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Team Efficiency</span>
                  <span className="text-green-400 font-medium">
                    {tasks.length > 0 ? Math.round(((tasks.length - unassignedTasks.length) / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}