import { Badge } from "@/components/ui/badge"
import { getStatusColor } from "@/lib/mock-data"

interface EmailStatusBadgeProps {
  status: "pending" | "created" | "rejected" | "revoked"
  className?: string
}

export function EmailStatusBadge({ status, className }: EmailStatusBadgeProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "created":
        return "Created"
      case "rejected":
        return "Rejected"
      case "revoked":
        return "Revoked"
      default:
        return "Unknown"
    }
  }

  return (
    <Badge variant="outline" className={`${getStatusColor(status)} ${className}`}>
      {getStatusText(status)}
    </Badge>
  )
}
