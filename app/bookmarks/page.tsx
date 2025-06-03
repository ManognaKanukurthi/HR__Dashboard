"use client"

import { useBookmarks } from "@/hooks/useBookmarks"
import { useSearch } from "@/hooks/useSearch"
import { EmployeeCard } from "@/components/employee-card"
import { SearchFilters } from "@/components/search-filters"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BookmarksPage() {
  const router = useRouter()
  const { bookmarkedUserDetails } = useBookmarks()

  const {
    searchQuery,
    setSearchQuery,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredUsers,
    availableDepartments,
  } = useSearch({ users: bookmarkedUserDetails })

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-6">Bookmarked Employees</h1>

        {bookmarkedUserDetails.length > 0 && (
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDepartments={selectedDepartments}
            setSelectedDepartments={setSelectedDepartments}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
            availableDepartments={availableDepartments}
          />
        )}
      </div>

      {bookmarkedUserDetails.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No bookmarked employees</h2>
          <p className="mt-2 text-muted-foreground">Bookmark employees from the dashboard to see them here.</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Go to Dashboard
          </Button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-muted-foreground">No bookmarked employees found matching your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user) => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
