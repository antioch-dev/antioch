export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="h-10 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-muted rounded w-48 mx-auto mb-2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-32 mx-auto animate-pulse" />
        </div>

        <div className="space-y-12">
          <section>
            <div className="text-center mb-8">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-2 animate-pulse" />
              <div className="h-4 bg-muted rounded w-32 mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
