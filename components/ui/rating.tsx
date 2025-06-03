import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
  showValue?: boolean
}

export function Rating({ value, max = 5, size = "md", className, showValue = false }: RatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(value)
  const hasHalfStar = value % 1 >= 0.5

  // Determine star size based on the size prop
  const starSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size]

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={cn("fill-yellow-400 text-yellow-400", starSize)} />
        ))}

        {hasHalfStar && <StarHalf className={cn("fill-yellow-400 text-yellow-400", starSize)} />}

        {Array.from({ length: max - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn("text-muted-foreground", starSize)} />
        ))}
      </div>

      {showValue && <span className="text-sm font-medium ml-1">{value.toFixed(1)}</span>}
    </div>
  )
}
