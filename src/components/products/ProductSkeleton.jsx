export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-neutral-100" />
      <div className="pt-3 space-y-2">
        <div className="h-3 bg-neutral-100 rounded w-3/4" />
        <div className="h-3 bg-neutral-100 rounded w-1/3" />
      </div>
    </div>
  );
}
