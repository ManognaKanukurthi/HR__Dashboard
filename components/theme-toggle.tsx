"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { useEffect } from "react"

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useStore()

  // Apply the theme class to the document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
