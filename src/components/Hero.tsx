import Image from "next/image";
import { bnToday } from "@/lib/bn";

export default function Hero() {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white/70 px-6 py-8 shadow-sm sm:px-8 md:py-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
                {/* বাম পাশ: লেখা */}
                <div>
                    {/* Eyebrow: ছোট লেখা */}
                    <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                        {bnToday()}
                    </span>

                    {/* মূল হেডিং */}
                    <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* সাবটাইটেল */}
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* CTA: একই পেজের #সব-পণ্য সেকশনে স্ক্রল করবে (anchor link) */}
                    <a
                        href="#সব-পণ্য"
                        className="mt-8 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-800"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* ডান পাশ: ব্যানার ছবি */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/bazar-hero.png"
                        alt="সবজি ও ফলে ভরা বাজারের ঝুড়ি"
                        width={420}
                        height={340}
                        priority
                        className="h-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
                    />
                </div>
            </div>
        </section>
    );
}