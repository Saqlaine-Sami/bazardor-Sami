import Link from "next/link";
import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
    return (
        <div className="mx-auto max-w-md py-10">
            <h1 className="text-center text-3xl font-bold">সাইন ইন</h1>
            <p className="mb-6 mt-2 text-center text-gray-600">
                বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
            <Suspense fallback={<div className="skeleton h-80 w-full rounded-3xl" />}>
                <SignInForm />
            </Suspense>
            <p className="mt-6 text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">← হোম পেজে ফিরে যান</Link>
            </p>
        </div>
    );
}