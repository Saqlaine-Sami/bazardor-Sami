import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { CHANGE_META, pctBn, unitBn } from "@/lib/format";
import type { Product } from "@/lib/types";

export default async function PriceTicker() {
    let products: Product[] = [];
    try {
        products = await getProducts();
    } catch {
        return null;
    }
    if (products.length === 0) return null;

    // দুইবার রাখা হয়েছে যাতে অসীমভাবে ঘুরতে থাকে
    const items = [...products, ...products];

    return (
        <div className="overflow-hidden border-y border-gray-200 bg-white/80">
            <div className="flex w-max animate-marquee">
                {items.map((p, i) => {
                    const meta = CHANGE_META[p.change.dir];
                    return (
                        <div
                            key={`${p.id}-${i}`}
                            className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-gray-200 px-5 py-3 text-sm"
                        >
                            <span>{p.image}</span>
                            <span className="font-medium">{p.nameBn}</span>
                            <span className="text-gray-600">
                                {toBn(p.today)} টাকা/{unitBn(p.unit)}
                            </span>
                            <span className={`font-semibold ${meta.text}`}>
                                {meta.symbol} {pctBn(p.change.pct)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}