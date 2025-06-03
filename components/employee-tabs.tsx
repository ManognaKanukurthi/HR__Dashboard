"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User, Project } from "@/types/user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface EmployeeTabsProps {
  user: User
}

export function EmployeeTabs({ user }: EmployeeTabsProps) {
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackRating, setFeedbackRating] = useState(5)

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedbackText.trim()) {
      toast({
        title: "Error",
        description: "Please enter feedback text",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Feedback submitted",
      description: "Your feedback has been submitted successfully",
    })

    setFeedbackText("")
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>View the employee&apos;s performance history over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.performanceHistory?.map((record, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    Q{record.quarter} {record.year}
                  </h4>
                  <Rating value={record.rating} showValue />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{record.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Employee&apos;s contact details and address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Phone</div>
                <div className="col-span-2">{user.phone}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Address</div>
                <div className="col-span-2">
                  {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
            <CardDescription>Projects the employee is currently working on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {user.projects?.map((project) => (
                <div key={project.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{project.name}</h4>
                    <ProjectStatusBadge status={project.status} />
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.completionPercentage}%</span>
                    </div>
                    <Progress value={project.completionPercentage} className="mt-1" />
                  </div>

                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    Due: {project.dueDate}
                  </div>
                </div>
              ))}

              {(!user.projects || user.projects.length === 0) && (
                <p className="text-center text-muted-foreground">No projects assigned</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="feedback" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Feedback History</CardTitle>
            <CardDescription>Previous feedback received by the employee</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.feedback?.map((feedback) => (
                <div key={feedback.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">From: {feedback.from}</h4>
                    <Rating value={feedback.rating} size="sm" />
                  </div>
                  <p className="mt-1 text-sm">{feedback.comment}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{feedback.date}</p>
                </div>
              ))}

              {(!user.feedback || user.feedback.length === 0) && (
                <p className="text-center text-muted-foreground">No feedback available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provide Feedback</CardTitle>
            <CardDescription>Submit your feedback for this employee</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant={feedbackRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFeedbackRating(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Feedback
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Enter your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit">Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      )
    case "planned":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400">
          <XCircle className="mr-1 h-3 w-3" />
          Planned
        </Badge>
      )
  }
}
