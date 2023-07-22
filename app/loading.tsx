import { SkeletonCard } from '@/components/skeleton-card'

export default function Loading() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">Loading...</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} isLoading={true} />
        ))}
      </div>
    </div>
  )
}
