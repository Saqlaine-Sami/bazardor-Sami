import Link from "next/link";

// ধাপ ৬-এ এখানে login অবস্থায় প্রোফাইল/সাইন আউট যোগ হবে
export default function AuthButtons() {
    return (
        <div className="flex items-center gap-2 sm:gap-4">
            <Link
                href="/signin"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
            >
                সাইন ইন
            </Link>
            <Link
                href="/signup"
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-800"
            >
                সাইন আপ
            </Link>
        </div>
    );
}