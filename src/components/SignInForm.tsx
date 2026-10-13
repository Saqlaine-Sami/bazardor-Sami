"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorBn } from "@/lib/auth-errors";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
    const router = useRouter();
    const params = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // সুরক্ষিত পেজ থেকে পাঠানো হলে লগইনের পর সেই পেজেই ফেরত যাবে
    const redirect = params.get("redirect");
    const target =
        redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";

    useEffect(() => {
        if (params.get("reason") === "protected") {
            toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
        }
    }, [params]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !password) {
            toast.error("ইমেইল ও পাসওয়ার্ড দিন");
            return;
        }
        setLoading(true);
        const { error } = await authClient.signIn.email({ email, password });
        setLoading(false);
        if (error) {
            toast.error(authErrorBn(error));
            return;
        }
        toast.success("সফলভাবে সাইন ইন হয়েছে");
        router.push(target);
        router.refresh();
    }

    const input = "input w-full bg-white";

    return (
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">ইমেইল</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={input} />
                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" className={input} />
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60">
                    {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-sm text-gray-500">
                <span className="h-px flex-1 bg-gray-200" />অথবা<span className="h-px flex-1 bg-gray-200" />
            </div>

            <SocialButtons callbackURL={target} />

            <p className="mt-6 text-center text-sm">
                অ্যাকাউন্ট নেই?{" "}
                <Link href="/signup" className="font-semibold text-green-700 hover:underline">সাইন আপ করুন</Link>
            </p>
        </div>
    );
}