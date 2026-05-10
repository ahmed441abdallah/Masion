import React from "react";
import { sans } from "@/lib/fonts";
export const ShopSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <aside className="col-span-1">
      <p
        className="text-[9px] tracking-[0.3em] uppercase text-stone-400 mb-3"
        style={sans}
      >
        Categories
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <span
            className="cursor-pointer block text-sm py-1.5 text-neutral-700 font-medium"
            style={sans}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </span>
        </li>
        {categories.filter(Boolean).map((c) => (
          <li key={c._id}>
            <span
              style={sans}
              onClick={() => setSelectedCategory(c._id)}
              className={`cursor-pointer block text-sm py-1.5 text-neutral-400 ${selectedCategory === c._id ? "text-neutral-700 font-medium" : ""}`}
            >
              {c.name}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
