"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useStore } from "@/store/useStore"
import type { User } from "@/types/user"
import { enrichUserData } from "@/lib/utils"
import { useBookmarks } from "@/hooks/useBookmarks"
import { Button } from "@/components/ui/button"
import { Rating } from "@/components/ui/rating"
import { PerformanceBadge } from "@/components/ui/performance-badge"
import { EmployeeTabs } from "@/components/employee-tabs"
import { ArrowLeft, Bookmark, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export default function EmployeeDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { users, promoteUser } = useStore()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  const [employee, setEmployee] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const employeeId = Number(params.id)

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true)
      setError(null)

      // Check if we already have the user in our store
      const existingUser = users.find((user) => user.id === employeeId)

      if (existingUser) {
        setEmployee(existingUser)
        setIsLoading(false)
        return
      }

      // Otherwise fetch from API
      try {
        const response = await fetch(`https://dummyjson.com/users/${employeeId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch employee details")
        }

        const data = await response.json()
        const enrichedUser = enrichUserData([data])[0]

        setEmployee(enrichedUser)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployee()
  }, [employeeId, users])

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>

            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="container py-6">
        <div className="rounded-lg border bg-destructive/10 p-6 text-center">
          <p className="text-destructive">{error || "Employee not found"}</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={employee.image || "/placeholder.svg"}
                alt={`${employee.firstName} ${employee.lastName}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-3xl font-bold">
                {employee.firstName} {employee.lastName}
              </h1>
              <PerformanceBadge value={employee.performance} />
            </div>

            <div className="mt-2 text-muted-foreground">
              {employee.department} • {employee.age} years
            </div>

            <div className="mt-2">
              <Rating value={employee.performance} showValue />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => toggleBookmark(employee.id)}
                className={
                  isBookmarked(employee.id)
                    ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                    : ""
                }
              >
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked(employee.id) ? "fill-current" : ""}`} />
                {isBookmarked(employee.id) ? "Bookmarked" : "Bookmark"}
              </Button>

              <Button variant="outline" onClick={() => promoteUser(employee.id)}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Promote
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EmployeeTabs user={employee} />
    </div>
  )
}
