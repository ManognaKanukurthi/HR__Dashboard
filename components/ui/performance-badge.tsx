import { cn } from "@/lib/utils"

interface PerformanceBadgeProps {
  value: number
  className?: string
}

export function PerformanceBadge({ value, className }: PerformanceBadgeProps) {
  // Determine color based on performance value
  const getColorClass = () => {
    if (value >= 4.5) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (value >= 3.5) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (value >= 2.5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    if (value >= 1.5) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  // Determine label based on performance value
  const getLabel = () => {
    if (value >= 4.5) return "Outstanding"
    if (value >= 3.5) return "Exceeds Expectations"
    if (value >= 2.5) return "Meets Expectations"
    if (value >= 1.5) return "Needs Improvement"
    return "Unsatisfactory"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getColorClass(),
        className,
      )}
    >
      {getLabel()}
    </span>
  )
}
