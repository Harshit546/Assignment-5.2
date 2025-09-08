export default function SkeletonLoader({ count = 6 }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-lg p-4 h-40" />
      ))}
    </div>
  )
}
