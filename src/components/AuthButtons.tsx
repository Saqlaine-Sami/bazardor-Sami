"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [open, setOpen] = useState(false);

    async function handleSignOut() {
        setOpen(false);
        const { error } = await authClient.signOut();
        if (error) {
            toast.error("সাইন আউট করা যায়নি");
            return;
        }
        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
    }

    if (isPending) {
        return (
            <div className="flex items-center gap-3">
                <div className="skeleton h-10 w-10 rounded-full" />
                <div className="skeleton hidden h-4 w-20 sm:block" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex shrink-0 items-center gap-1 sm:gap-4">
                <Link href="/signin" className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 sm:px-3">
                    সাইন ইন
                </Link>
                <Link href="/signup" className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-green-800 sm:px-4">
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const { name, email, image } = session.user;
    const firstName = name.split(" ")[0];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100"
                aria-expanded={open}
            >
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-green-700 font-bold text-white">
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
                <span className="hidden text-sm font-medium sm:block">{firstName}</span>
                <span className="text-xs text-gray-500">▾</span>
            </button>

            {open && (
                <>
                    {/* বাইরে ক্লিক করলে বন্ধ হবে */}
                    <button aria-label="বন্ধ করুন" className="fixed inset-0 z-10 cursor-default" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
                        <p className="font-semibold">{name}</p>
                        <p className="break-all text-sm text-gray-500">{email}</p>
                        <div className="mt-4 space-y-1 border-t border-gray-100 pt-3">
                            <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm hover:bg-gray-100">
                                👤 আমার প্রোফাইল
                            </Link>
                            <button onClick={handleSignOut} className="block w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                ↩ সাইন আউট
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}