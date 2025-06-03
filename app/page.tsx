"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/store/useStore"
import { enrichUserData } from "@/lib/utils"
import { useSearch } from "@/hooks/useSearch"
import { EmployeeCard } from "@/components/employee-card"
import { SearchFilters } from "@/components/search-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const { users, setUsers, setDepartments, isLoading, setLoading, error, setError } = useStore()
  const [page, setPage] = useState(1)
  const limit = 20

  const {
    searchQuery,
    setSearchQuery,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
    availableDepartments,
  } = useSearch({ users })

  useEffect(() => {
    const fetchUsers = async () => {
      if (users.length > 0) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`)

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await response.json()
        const enrichedUsers = enrichUserData(data.users)

        setUsers(enrichedUsers)

        // Extract unique departments
        const departments = Array.from(new Set(enrichedUsers.map((user) => user.department)))
        setDepartments(departments)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [page, setUsers, setDepartments, setLoading, setError, users.length])

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
          availableDepartments={availableDepartments}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-32 mt-4" />
                <Skeleton className="h-4 w-48 mt-2" />
                <Skeleton className="h-4 w-24 mt-2" />
                <Skeleton className="h-4 w-32 mt-3" />
              </div>
              <div className="p-4 pt-0 flex justify-between gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Error: {error}</p>
          <button
            className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className="rounded-lg border p-6 text-center">
              <p className="text-muted-foreground">No employees found matching your filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredUsers.map((user) => (
                <EmployeeCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
