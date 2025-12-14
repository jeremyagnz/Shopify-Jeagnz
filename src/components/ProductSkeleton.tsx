function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 sm:h-56 md:h-64 bg-neutral-200 dark:bg-neutral-700" />
      
      {/* Content placeholder */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Title placeholder */}
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-3/4" />
        
        {/* Price placeholder */}
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-3 w-1/3" />
        
        {/* Description placeholder */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
        </div>
        
        {/* Button placeholder */}
        <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </div>
    </div>
  )
}

function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}

export { ProductSkeleton, ProductSkeletonGrid }
