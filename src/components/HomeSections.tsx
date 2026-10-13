import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

function SectionHeading({
    title,
    icon,
    iconClass = "",
}: {
    title: string;
    icon?: string;
    iconClass?: string;
}) {
    return (
        <h2 className="flex items-center gap-2 text-2xl font-bold">
            {icon && <span className={`text-lg ${iconClass}`}>{icon}</span>}
            {title}
        </h2>
    );
}

export default async function HomeSections() {
    let products: Product[];
    try {
        products = await getProducts();
    } catch {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                ডেটা লোড করা যায়নি। কিছুক্ষণ পর পেজ রিফ্রেশ করে আবার চেষ্টা করুন।
            </div>
        );
    }

    // শীর্ষ ৬: যেগুলোর দাম সবচেয়ে বেশি বেড়েছে / কমেছে
    const risers = products
        .filter((p) => p.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const fallers = products
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6);

    return (
        <>
            {/* Section A */}
            <section className="space-y-5">
                <SectionHeading title="আজ দাম বেড়েছে" icon="▲" iconClass="text-red-600" />
                <ProductGrid products={risers} />
            </section>

            {/* Section B */}
            <section className="space-y-5">
                <SectionHeading title="আজ দাম কমেছে" icon="▼" iconClass="text-green-600" />
                <ProductGrid products={fallers} />
            </section>

            {/* Section C: Hero-র CTA বাটন এখানে স্ক্রল করে আসবে */}
            <section id="সব-পণ্য" className="scroll-mt-6 space-y-5">
                <div>
                    <SectionHeading title="সব পণ্য" />
                    <p className="mt-2 text-gray-600">
                        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>
                <ProductGrid products={products} />
            </section>
        </>
    );
}