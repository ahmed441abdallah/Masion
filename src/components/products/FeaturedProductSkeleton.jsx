export default function FeaturedProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-stone-200 rounded-sm" />
      <div className="mt-4 flex justify-between gap-2">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-stone-200 rounded w-3/4" />
          <div className="h-3 bg-stone-100 rounded w-1/2" />
        </div>
        <div className="h-4 bg-stone-200 rounded w-12" />
      </div>
      <div className="mt-3 flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-stone-200" />
        ))}
      </div>
    </div>
  );
}
