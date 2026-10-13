"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileCard({
    name,
    email,
    image,
}: {
    name: string;
    email: string;
    image?: string | null;
}) {
    const router = useRouter();

    async function handleSignOut() {
        const { error } = await authClient.signOut();
        if (error) {
            toast.error("সাইন আউট করা যায়নি");
            return;
        }
        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
    }

    return (
        <div className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={name}
                        referrerPolicy="no-referrer"
                        className="h-20 w-20 rounded-2xl object-cover"
                    />
                ) : (
                    <span className="grid h-20 w-20 place-items-center rounded-2xl bg-green-700 text-3xl font-bold text-white">
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
                <div className="min-w-0">
                    <p className="text-2xl font-semibold">{name}</p>
                    <p className="break-all text-gray-600">{email}</p>
                </div>
            </div>

            <button
                onClick={handleSignOut}
                className="rounded-lg border border-red-300 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
            >
                ↩ সাইন আউট
            </button>
        </div>
    );
}