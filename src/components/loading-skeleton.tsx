export function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 skeleton"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded skeleton"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded skeleton"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 skeleton"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2 skeleton"></div>
        <div className="h-10 bg-gray-200 rounded-xl skeleton"></div>
      </div>
    </div>
  )
}
