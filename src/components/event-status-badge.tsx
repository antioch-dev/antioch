import { Badge } from "@/components/ui/badge"
import { Clock, Radio, CheckCircle } from "lucide-react"

interface EventStatusBadgeProps {
  status: "upcoming" | "live" | "ended"
  className?: string
}

export function EventStatusBadge({ status, className }: EventStatusBadgeProps) {
  const statusConfig = {
    upcoming: {
      label: "Upcoming",
      variant: "secondary" as const,
      icon: Clock,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    live: {
      label: "Live",
      variant: "destructive" as const,
      icon: Radio,
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse",
    },
    ended: {
      label: "Ended",
      variant: "outline" as const,
      icon: CheckCircle,
      className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={`${config.className} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}
