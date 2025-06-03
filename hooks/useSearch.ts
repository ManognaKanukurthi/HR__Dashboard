"use client"

import { useState, useMemo } from "react"
import type { User } from "@/types/user"

interface UseSearchProps {
  users: User[]
  initialQuery?: string
  initialDepartments?: string[]
  initialRatings?: number[]
}

export function useSearch({ users, initialQuery = "", initialDepartments = [], initialRatings = [] }: UseSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(initialDepartments)
  const [selectedRatings, setSelectedRatings] = useState<number[]>(initialRatings)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search query filter
      const matchesQuery =
        searchQuery === "" ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())

      // Department filter
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(user.department)

      // Rating filter
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.round(user.performance))

      return matchesQuery && matchesDepartment && matchesRating
    })
  }, [users, searchQuery, selectedDepartments, selectedRatings])

  const availableDepartments = useMemo(() => {
    return Array.from(new Set(users.map((user) => user.department)))
  }, [users])

  return {
    searchQuery,
    setSearchQuery,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
    availableDepartments,
  }
}
