"use client"

import type { User } from "@/types/user"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Rating } from "@/components/ui/rating"
import { Bookmark, Eye, TrendingUp } from "lucide-react"
import { useBookmarks } from "@/hooks/useBookmarks"
import { useStore } from "@/store/useStore"
import Link from "next/link"
import Image from "next/image"

interface EmployeeCardProps {
  user: User
}

export function EmployeeCard({ user }: EmployeeCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { promoteUser } = useStore()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col items-center p-6 pb-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image
              src={user.image || "/placeholder.svg"}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-medium">{user.department}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm font-medium">{user.age} years</span>
          </div>
          <div className="mt-3">
            <Rating value={user.performance} showValue />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 p-4 pt-0">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/employee/${user.id}`}>
            <Eye className="mr-1 h-4 w-4" />
            View
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleBookmark(user.id)}
          className={
            isBookmarked(user.id)
              ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
              : ""
          }
        >
          <Bookmark className={`mr-1 h-4 w-4 ${isBookmarked(user.id) ? "fill-current" : ""}`} />
          {isBookmarked(user.id) ? "Bookmarked" : "Bookmark"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => promoteUser(user.id)}>
          <TrendingUp className="mr-1 h-4 w-4" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  )
}
