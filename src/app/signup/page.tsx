import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
    return (
        <div className="mx-auto max-w-md py-10">
            <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
            <p className="mb-6 mt-2 text-center text-gray-600">
                বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
            <SignUpForm />
            <p className="mt-6 text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">← হোম পেজে ফিরে যান</Link>
            </p>
        </div>
    );
}