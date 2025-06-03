"use client"

import { useStore } from "@/store/useStore"
import { useMemo } from "react"

export function useBookmarks() {
  const { users, bookmarkedUsers, toggleBookmark } = useStore()

  const bookmarkedUserDetails = useMemo(() => {
    return users.filter((user) => bookmarkedUsers.includes(user.id))
  }, [users, bookmarkedUsers])

  const isBookmarked = (userId: number) => bookmarkedUsers.includes(userId)

  return {
    bookmarkedUsers,
    bookmarkedUserDetails,
    toggleBookmark,
    isBookmarked,
  }
}
