"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bookmark, BarChart3, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">HR Dashboard</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navigation.map((item) => (
            <Button
              key={item.name}
              asChild
              variant="ghost"
              className={cn(pathname === item.href ? "bg-muted" : "hover:bg-transparent hover:text-primary")}
            >
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t p-4 flex flex-col space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.name}
              asChild
              variant="ghost"
              className={cn(
                "justify-start",
                pathname === item.href ? "bg-muted" : "hover:bg-transparent hover:text-primary",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
      )}
    </header>
  )
}
