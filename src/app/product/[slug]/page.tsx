import Link from "next/link";
import { redirect } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { CHANGE_META, pctBn, toBnPrice, unitBn } from "@/lib/format";
import { getSession } from "@/lib/session";
import type { Product } from "@/lib/types";
import EmptyState from "@/components/EmptyState";

export const dynamic = "force-dynamic";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // সুরক্ষিত রুট: লগইন না থাকলে সাইন ইন পেজে পাঠাও (toast সেখানে দেখাবে)
    const session = await getSession();
    if (!session) {
        redirect(
            `/signin?reason=protected&redirect=${encodeURIComponent(`/product/${slug}`)}`
        );
    }

    let product: Product | null;
    try {
        product = await getProductBySlug(slug);
    } catch {
        return (
            <div className="py-8">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
                    ডেটা লোড করা যায়নি। কিছুক্ষণ পর পেজ রিফ্রেশ করে আবার চেষ্টা করুন।
                </div>
            </div>
        );
    }

    // ভুল slug: 404-স্টাইল বার্তা + হোমে ফেরার বাটন
    if (!product) {
        return (
            <div className="py-12">
                <EmptyState
                    title="পণ্যটি খুঁজে পাওয়া যায়নি"
                    message="আপনি যে পণ্যটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।"
                />
            </div>
        );
    }

    const p = product;
    const meta = CHANGE_META[p.change.dir];
    const diff = Math.abs(p.today - p.yesterday);

    // দামের সারসংক্ষেপ
    const rows = p.markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);
    const hasMarkets = rows.length > 0;
    const minPrice = hasMarkets ? Math.min(...p.markets.map((m) => m.min)) : 0;
    const maxPrice = hasMarkets ? Math.max(...p.markets.map((m) => m.max)) : 0;
    const avgPrice = hasMarkets
        ? Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length)
        : 0;

    return (
        <div className="space-y-6 py-8">
            {/* ব্রেডক্রাম্ব */}
            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-green-700">হোম</Link>
                <span>›</span>
                <Link href={`/category/${p.category}`} className="hover:text-green-700">
                    {p.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-900">{p.nameBn}</span>
            </nav>

            {/* উপরের সামারি */}
            <section className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                    <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gray-100 text-5xl">
                        {p.image}
                    </span>
                    <div>
                        <h1 className="text-3xl font-bold sm:text-4xl">{p.nameBn}</h1>
                        <p className="mt-1 text-gray-600">
                            প্রতি {unitBn(p.unit)} ·{" "}
                            <Link
                                href={`/category/${p.category}`}
                                className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 hover:bg-green-200"
                            >
                                {p.categoryNameBn}
                            </Link>
                        </p>
                        <p className="mt-2 text-gray-800">
                            {p.change.dir === "flat" ? (
                                "গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে"
                            ) : (
                                <>
                                    গতকালের তুলনায় আজ দাম{" "}
                                    <strong>{p.change.dir === "up" ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
                                    {toBn(diff)} টাকা
                                </>
                            )}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl bg-gray-50 px-8 py-5 text-center">
                    <p className="text-sm text-gray-500">আজকের দাম</p>
                    <p className="text-4xl font-bold text-green-700">{toBn(p.today)}</p>
                    <p className="text-sm text-gray-600">টাকা / {unitBn(p.unit)}</p>
                    <p className={`mt-1 text-sm font-semibold ${meta.text}`}>
                        {meta.symbol} {pctBn(p.change.pct)}
                    </p>
                </div>
            </section>

            {hasMarkets && (
                <section className="space-y-6 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm">
                    {/* দামের সারসংক্ষেপ */}
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">দামের সারসংক্ষেপ</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-gray-200 p-5">
                                <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
                                <p className="mt-1 text-3xl font-bold text-green-700">
                                    {toBn(minPrice)} <span className="text-lg">টাকা</span>
                                </p>
                                <p className="mt-1 text-sm text-gray-600">সবচেয়ে কম দামের বাজার</p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 p-5">
                                <p className="text-sm text-gray-600">সর্বাধিক দাম</p>
                                <p className="mt-1 text-3xl font-bold text-red-600">
                                    {toBn(maxPrice)} <span className="text-lg">টাকা</span>
                                </p>
                                <p className="mt-1 text-sm text-gray-600">সবচেয়ে বেশি দামের বাজার</p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 p-5">
                                <p className="text-sm text-gray-600">গড় দাম</p>
                                <p className="mt-1 text-3xl font-bold text-green-700">
                                    {toBn(avgPrice)} <span className="text-lg">টাকা</span>
                                </p>
                                <p className="mt-1 text-sm text-gray-600">
                                    প্রতি {unitBn(p.unit)}-এর হিসাবে
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* বাজারভিত্তিক আজকের দাম */}
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
                        <div className="overflow-x-auto rounded-2xl border border-gray-200">
                            <table className="w-full min-w-[620px] text-left">
                                <thead className="text-sm text-gray-500">
                                    <tr className="border-b border-gray-200">
                                        <th className="px-5 py-4 font-medium">বাজার</th>
                                        <th className="px-5 py-4 font-medium">বিভাগ</th>
                                        <th className="px-5 py-4 text-right font-medium">সর্বনিম্ন</th>
                                        <th className="px-5 py-4 text-right font-medium">সর্বাধিক</th>
                                        <th className="px-5 py-4 text-right font-medium">গড়</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((r, i) => (
                                        <tr
                                            key={`${r.market}-${i}`}
                                            className={`border-b border-gray-200 last:border-0 ${i % 2 === 1 ? "bg-gray-50" : ""
                                                }`}
                                        >
                                            <td className="px-5 py-4">{r.market}</td>
                                            <td className="px-5 py-4 text-gray-700">{r.division}</td>
                                            <td className="px-5 py-4 text-right text-gray-700">
                                                {toBn(r.min)} টাকা
                                            </td>
                                            <td className="px-5 py-4 text-right text-gray-700">
                                                {toBn(r.max)} টাকা
                                            </td>
                                            <td className="px-5 py-4 text-right font-bold">
                                                {toBnPrice(r.avg)} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}