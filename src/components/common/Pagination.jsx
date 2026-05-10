// components/ui/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  onNext,
  onPrev,
  isNextDisabled,
  isPrevDisabled,
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-neutral-100">
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className="flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-widest bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm"
      >
        <ChevronLeft size={14} />
        Prev
      </button>

      <span className="text-xs tracking-widest text-neutral-500">
        PAGE {page}
      </span>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-widest bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm"
      >
        Next
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
