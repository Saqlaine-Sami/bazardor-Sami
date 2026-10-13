"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

type SortKey = "default" | "asc" | "desc";

const OPTIONS: { value: SortKey; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "asc", label: "দাম: কম থেকে বেশি" },
    { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProducts({ products }: { products: Product[] }) {
    const [sort, setSort] = useState<SortKey>("default");

    // দাম (number) ধরে সাজানো হয়, বাংলা লেখা ধরে নয়, তাই ৯৯ < ১৪৮ ঠিকভাবেই কাজ করে
    const sorted = useMemo(() => {
        if (sort === "asc") return [...products].sort((a, b) => a.today - b.today);
        if (sort === "desc") return [...products].sort((a, b) => b.today - a.today);
        return products;
    }, [products, sort]);

    return (
        <div className="space-y-5">
            {/* Sort control */}
            <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white/80 px-5 py-4">
                <label htmlFor="sort" className="text-gray-600">
                    সাজান
                </label>
                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="select select-bordered select-sm bg-white sm:select-md"
                >
                    {OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>

            <p className="text-gray-600">
                মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <ProductGrid products={sorted} />
        </div>
    );
}