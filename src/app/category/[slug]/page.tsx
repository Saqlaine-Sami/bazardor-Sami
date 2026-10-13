import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let items;
    try {
        const all = await getProducts();
        items = all.filter((p) => p.category === slug);
    } catch {
        return (
            <div className="py-8">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                    ডেটা লোড করা যায়নি। কিছুক্ষণ পর পেজ রিফ্রেশ করে আবার চেষ্টা করুন।
                </div>
            </div>
        );
    }

    // ভুল slug বা খালি ক্যাটাগরি: 404-স্টাইল বার্তা + হোমে ফেরার বাটন
    if (items.length === 0) {
        return (
            <div className="py-12">
                <EmptyState
                    title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
                    message="আপনি যে ক্যাটাগরি খুঁজছেন সেটি নেই অথবা এতে এখনো কোনো পণ্য যোগ হয়নি।"
                />
            </div>
        );
    }

    const first = items[0];

    return (
        <div className="space-y-6 py-8">
            {/* শিরোনাম + আইকন */}
            <section className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-white/80 px-6 py-6 shadow-sm">
                <span className="text-5xl">{first.categoryIcon}</span>
                <div>
                    <h1 className="text-3xl font-bold">{first.categoryNameBn}</h1>
                    <p className="text-gray-600">
                        {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>

            <CategoryProducts products={items} />
        </div>
    );
}