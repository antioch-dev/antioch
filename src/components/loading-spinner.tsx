export default function LoadingSpinner({
  size = "md",
  className = "",
}: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full loading-spinner"></div>
    </div>
  )
}
