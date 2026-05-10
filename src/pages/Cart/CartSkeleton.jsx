function CartSkeleton() {
  return (
    <div className="space-y-0 divide-y divide-neutral-100">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-5 py-6 animate-pulse">
          <div className="w-24 h-28 bg-neutral-100 rounded-sm shrink-0" />
          <div className="flex-1 space-y-3 pt-1">
            <div className="h-2.5 w-16 bg-neutral-100 rounded" />
            <div className="h-4 w-48 bg-neutral-100 rounded" />
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-14 bg-neutral-100 rounded" />
              <div className="h-5 w-14 bg-neutral-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSkeleton;