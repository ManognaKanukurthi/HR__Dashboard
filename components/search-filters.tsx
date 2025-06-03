"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, Search, X } from "lucide-react"

interface SearchFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedDepartments: string[]
  setSelectedDepartments: (departments: string[]) => void
  selectedRatings: number[]
  setSelectedRatings: (ratings: number[]) => void
  availableDepartments: string[]
}

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartments,
  setSelectedDepartments,
  selectedRatings,
  setSelectedRatings,
  availableDepartments,
}: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments(
      selectedDepartments.includes(department)
        ? selectedDepartments.filter((d) => d !== department)
        : [...selectedDepartments, department],
    )
  }

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating) ? selectedRatings.filter((r) => r !== rating) : [...selectedRatings, rating],
    )
  }

  const clearFilters = () => {
    setSelectedDepartments([])
    setSelectedRatings([])
    setSearchQuery("")
  }

  const hasActiveFilters = selectedDepartments.length > 0 || selectedRatings.length > 0 || searchQuery.length > 0

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, email, or department..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 w-7 rounded-full p-0"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <DropdownMenu open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {selectedDepartments.length + selectedRatings.length + (searchQuery ? 1 : 0)}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Departments</DropdownMenuLabel>
            {availableDepartments.map((department) => (
              <DropdownMenuCheckboxItem
                key={department}
                checked={selectedDepartments.includes(department)}
                onCheckedChange={() => handleDepartmentToggle(department)}
              >
                {department}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Performance Rating</DropdownMenuLabel>
            {[1, 2, 3, 4, 5].map((rating) => (
              <DropdownMenuCheckboxItem
                key={rating}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              >
                {rating} {rating === 1 ? "Star" : "Stars"}
              </DropdownMenuCheckboxItem>
            ))}

            {hasActiveFilters && (
              <>
                <DropdownMenuSeparator />
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
