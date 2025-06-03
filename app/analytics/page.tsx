"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store/useStore"
import { getDepartmentStats, getBookmarkTrends } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsPage() {
  const { users, isLoading } = useStore()
  const [departmentStats, setDepartmentStats] = useState<any[]>([])
  const [bookmarkTrends, setBookmarkTrends] = useState<any[]>([])

  useEffect(() => {
    if (users.length > 0) {
      setDepartmentStats(getDepartmentStats(users))
      setBookmarkTrends(getBookmarkTrends())
    }
  }, [users])

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average performance rating by department</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ChartContainer
                config={{
                  averagePerformance: {
                    label: "Average Performance",
                    color: "hsl(var(--chart-1))",
                  },
                  employeeCount: {
                    label: "Employee Count",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-averagePerformance)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-employeeCount)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="averagePerformance"
                      fill="var(--color-averagePerformance)"
                      name="Average Performance"
                      radius={4}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="employeeCount"
                      fill="var(--color-employeeCount)"
                      name="Employee Count"
                      radius={4}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookmark Trends</CardTitle>
            <CardDescription>Number of bookmarked employees over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ChartContainer
                config={{
                  bookmarks: {
                    label: "Bookmarks",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookmarkTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="bookmarks"
                      stroke="var(--color-bookmarks)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Bookmarks"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Distribution of performance ratings across all employees</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ChartContainer
                config={{
                  count: {
                    label: "Employee Count",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { rating: "1 Star", count: users.filter((u) => Math.round(u.performance) === 1).length },
                      { rating: "2 Stars", count: users.filter((u) => Math.round(u.performance) === 2).length },
                      { rating: "3 Stars", count: users.filter((u) => Math.round(u.performance) === 3).length },
                      { rating: "4 Stars", count: users.filter((u) => Math.round(u.performance) === 4).length },
                      { rating: "5 Stars", count: users.filter((u) => Math.round(u.performance) === 5).length },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="count" fill="var(--color-count)" name="Employee Count" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
