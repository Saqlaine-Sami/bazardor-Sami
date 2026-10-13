"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorBn } from "@/lib/auth-errors";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !email || !password) {
            toast.error("সবগুলো ঘর পূরণ করুন");
            return;
        }
        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
            return;
        }
        if (password !== confirm) {
            toast.error("দুটো পাসওয়ার্ড মেলেনি");
            return;
        }
        setLoading(true);
        const { error } = await authClient.signUp.email({ name: name.trim(), email, password });
        setLoading(false);
        if (error) {
            toast.error(authErrorBn(error));
            return;
        }
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
        router.push("/signin");
    }

    const input = "input w-full bg-white";

    return (
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">নাম</label>
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="যেমন: রহিম উদ্দিন" className={input} />
                </div>
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">ইমেইল</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={input} />
                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" className={input} />
                </div>
                <div>
                    <label htmlFor="confirm" className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="আবার লিখুন" className={input} />
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60">
                    {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-sm text-gray-500">
                <span className="h-px flex-1 bg-gray-200" />অথবা<span className="h-px flex-1 bg-gray-200" />
            </div>

            <SocialButtons callbackURL="/" />

            <p className="mt-6 text-center text-sm">
                অ্যাকাউন্ট আছে?{" "}
                <Link href="/signin" className="font-semibold text-green-700 hover:underline">সাইন ইন করুন</Link>
            </p>
        </div>
    );
}