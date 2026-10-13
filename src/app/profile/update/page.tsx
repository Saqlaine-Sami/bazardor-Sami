import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import UpdateNameForm from "@/components/UpdateNameForm";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
    const session = await getSession();
    if (!session) {
        redirect("/signin?reason=protected&redirect=%2Fprofile%2Fupdate");
    }
    const { name, email, image } = session.user;

    return (
        <div className="mx-auto max-w-3xl space-y-6 py-8">
            <div>
                <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
                <p className="mt-1 text-gray-600">আপনার নাম বদলে আপডেট করুন।</p>
            </div>

            <ProfileCard name={name} email={email} image={image} />

            <section className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">তথ্য</h2>
                <UpdateNameForm currentName={name} />
            </section>

            <p>
                <Link href="/profile" className="text-sm text-gray-500 hover:text-gray-800">
                    ← প্রোফাইলে ফিরে যান
                </Link>
            </p>
        </div>
    );
}