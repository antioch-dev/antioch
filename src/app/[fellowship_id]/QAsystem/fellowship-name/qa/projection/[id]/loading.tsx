export default function ProjectionLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold">Loading Projection View...</h2>
        <p className="text-gray-400 mt-2">Preparing questions for display</p>
      </div>
    </div>
  )
}
