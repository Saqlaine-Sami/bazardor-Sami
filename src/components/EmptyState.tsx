import Link from "next/link";

export default function EmptyState({
    title = "পেজটি খুঁজে পাওয়া যায়নি",
    message = "আপনি যে পেজ বা ক্যাটাগরি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।",
}: {
    title?: string;
    message?: string;
}) {
    return (
        <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white/80 px-6 py-12 text-center shadow-sm">
            <p className="text-6xl font-bold text-green-700">৪০৪</p>
            <h2 className="mt-4 text-2xl font-bold">{title}</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <Link
                href="/"
                className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-800"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}