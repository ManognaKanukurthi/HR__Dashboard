import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types/user"

interface StoreState {
  bookmarkedUsers: number[]
  users: User[]
  departments: string[]
  isLoading: boolean
  error: string | null
  darkMode: boolean

  // Actions
  toggleBookmark: (userId: number) => void
  setUsers: (users: User[]) => void
  setDepartments: (departments: string[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  toggleDarkMode: () => void
  promoteUser: (userId: number) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      bookmarkedUsers: [],
      users: [],
      departments: [],
      isLoading: false,
      error: null,
      darkMode: false,

      toggleBookmark: (userId) =>
        set((state) => ({
          bookmarkedUsers: state.bookmarkedUsers.includes(userId)
            ? state.bookmarkedUsers.filter((id) => id !== userId)
            : [...state.bookmarkedUsers, userId],
        })),

      setUsers: (users) => set({ users }),
      setDepartments: (departments) => set({ departments }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      promoteUser: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, performance: Math.min(5, user.performance + 0.5) } : user,
          ),
        })),
    }),
    {
      name: "hr-dashboard-storage",
      partialize: (state) => ({
        bookmarkedUsers: state.bookmarkedUsers,
        darkMode: state.darkMode,
      }),
    },
  ),
)
