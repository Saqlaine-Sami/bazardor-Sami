import Link from "next/link";
import { toBn } from "@/lib/bn";
import { CHANGE_META, pctBn, unitBn } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product: p }: { product: Product }) {
    const meta = CHANGE_META[p.change.dir];

    return (
        <Link
            href={`/product/${p.slug}`}
            className="block rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            {/* ছবি (emoji), নাম ও একক */}
            <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gray-100 text-3xl">
                    {p.image}
                </span>
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-snug">{p.nameBn}</h3>
                    <p className="text-sm text-gray-500">প্রতি {unitBn(p.unit)}</p>
                </div>
            </div>

            {/* দামের সারি */}
            <div className="mt-5">
                <p className="text-sm text-gray-600">আজকের দাম</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                    <p>
                        <span className="text-2xl font-bold">{toBn(p.today)}</span>{" "}
                        <span className="text-gray-700">টাকা</span>
                    </p>
                    <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${meta.badge}`}
                    >
                        {meta.symbol} {pctBn(p.change.pct)}
                    </span>
                </div>
            </div>
        </Link>
    );
}