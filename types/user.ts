export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  department: string
  performance: number
  projects?: Project[]
  feedback?: Feedback[]
  performanceHistory?: PerformanceRecord[]
}

export interface Project {
  id: number
  name: string
  status: "completed" | "in-progress" | "planned"
  completionPercentage: number
  dueDate: string
}

export interface Feedback {
  id: number
  from: string
  date: string
  rating: number
  comment: string
}

export interface PerformanceRecord {
  year: number
  quarter: number
  rating: number
  notes: string
}

export interface Department {
  name: string
  employeeCount: number
  averagePerformance: number
}
