import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User, Project, Feedback, PerformanceRecord } from "@/types/user"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Product",
  "Design",
  "Customer Support",
]

export function enrichUserData(users: any[]): User[] {
  return users.map((user) => {
    const department = departments[Math.floor(Math.random() * departments.length)]
    const performance = Number.parseFloat((Math.random() * 4 + 1).toFixed(1)) // 1.0 to 5.0

    return {
      ...user,
      department,
      performance,
      projects: generateProjects(),
      feedback: generateFeedback(),
      performanceHistory: generatePerformanceHistory(),
    }
  })
}

export function generateProjects(): Project[] {
  const projectCount = Math.floor(Math.random() * 5) + 1 // 1 to 5 projects
  const projects: Project[] = []

  const statuses: ("completed" | "in-progress" | "planned")[] = ["completed", "in-progress", "planned"]
  const projectNames = [
    "Website Redesign",
    "Mobile App Development",
    "Data Migration",
    "Cloud Infrastructure",
    "Marketing Campaign",
    "Product Launch",
    "Customer Research",
    "Security Audit",
    "Performance Optimization",
  ]

  for (let i = 0; i < projectCount; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const completionPercentage =
      status === "completed" ? 100 : status === "planned" ? 0 : Math.floor(Math.random() * 90) + 5 // 5% to 95%

    // Generate a random date in the next 3 months
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 90))

    projects.push({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      status,
      completionPercentage,
      dueDate: dueDate.toISOString().split("T")[0],
    })
  }

  return projects
}

export function generateFeedback(): Feedback[] {
  const feedbackCount = Math.floor(Math.random() * 4) + 1 // 1 to 4 feedback items
  const feedback: Feedback[] = []

  const names = [
    "John Smith",
    "Emma Johnson",
    "Michael Brown",
    "Sophia Davis",
    "William Wilson",
    "Olivia Taylor",
    "James Anderson",
    "Ava Thomas",
  ]

  for (let i = 0; i < feedbackCount; i++) {
    // Generate a random date in the past year
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 365))

    feedback.push({
      id: i + 1,
      from: names[Math.floor(Math.random() * names.length)],
      date: date.toISOString().split("T")[0],
      rating: Math.floor(Math.random() * 5) + 1, // 1 to 5
      comment: getRandomFeedbackComment(),
    })
  }

  return feedback
}

export function generatePerformanceHistory(): PerformanceRecord[] {
  const history: PerformanceRecord[] = []
  const currentYear = new Date().getFullYear()

  // Generate performance records for the past 2 years
  for (let year = currentYear - 2; year <= currentYear; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      // Skip future quarters
      if (year === currentYear && quarter > Math.ceil((new Date().getMonth() + 1) / 3)) {
        continue
      }

      history.push({
        year,
        quarter,
        rating: Number.parseFloat((Math.random() * 4 + 1).toFixed(1)), // 1.0 to 5.0
        notes: getRandomPerformanceNote(),
      })
    }
  }

  return history.sort((a, b) => {
    // Sort by year (descending) and then by quarter (descending)
    if (a.year !== b.year) return b.year - a.year
    return b.quarter - a.quarter
  })
}

function getRandomFeedbackComment(): string {
  const comments = [
    "Consistently delivers high-quality work.",
    "Great team player and collaborator.",
    "Needs improvement in meeting deadlines.",
    "Excellent problem-solving skills.",
    "Shows strong leadership potential.",
    "Communication skills could be improved.",
    "Very detail-oriented and thorough.",
    "Takes initiative and goes beyond expectations.",
    "Adapts well to changing priorities.",
    "Needs more technical training in specific areas.",
  ]

  return comments[Math.floor(Math.random() * comments.length)]
}

function getRandomPerformanceNote(): string {
  const notes = [
    "Exceeded targets for the quarter.",
    "Met all objectives and showed improvement.",
    "Struggled with new project requirements.",
    "Demonstrated excellent leadership skills.",
    "Needs improvement in technical skills.",
    "Successfully completed all assigned projects.",
    "Showed great initiative in process improvements.",
    "Communication with team members needs work.",
    "Adapted well to organizational changes.",
    "Received positive feedback from clients.",
  ]

  return notes[Math.floor(Math.random() * notes.length)]
}

export function getDepartmentStats(users: User[]) {
  const departmentMap = new Map<string, { count: number; totalPerformance: number }>()

  users.forEach((user) => {
    if (!departmentMap.has(user.department)) {
      departmentMap.set(user.department, { count: 0, totalPerformance: 0 })
    }

    const dept = departmentMap.get(user.department)!
    dept.count++
    dept.totalPerformance += user.performance
  })

  return Array.from(departmentMap.entries()).map(([name, stats]) => ({
    name,
    employeeCount: stats.count,
    averagePerformance: Number.parseFloat((stats.totalPerformance / stats.count).toFixed(2)),
  }))
}

export function getBookmarkTrends() {
  // Mock data for bookmark trends over the last 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const currentMonth = new Date().getMonth()

  return months.map((month, index) => ({
    month,
    bookmarks: Math.floor(Math.random() * 15) + 5, // 5 to 20 bookmarks
    isCurrent: index === currentMonth % 6,
  }))
}
