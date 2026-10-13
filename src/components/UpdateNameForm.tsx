"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorBn } from "@/lib/auth-errors";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
    const router = useRouter();
    const [name, setName] = useState(currentName);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) {
            toast.error("নাম খালি রাখা যাবে না");
            return;
        }
        setLoading(true);
        const { error } = await authClient.updateUser({ name: trimmed });
        setLoading(false);
        if (error) {
            toast.error(authErrorBn(error));
            return;
        }
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
        router.push("/profile");
        router.refresh();
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    নাম
                </label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="input w-full bg-white"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
                {loading ? "অপেক্ষা করুন..." : "আপডেট"}
            </button>
        </form>
    );
}