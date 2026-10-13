import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const session = await getSession();
    if (!session) {
        redirect("/signin?reason=protected&redirect=%2Fprofile");
    }
    const { name, email, image } = session.user;

    return (
        <div className="mx-auto max-w-3xl space-y-6 py-8">
            <div>
                <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
                <p className="mt-1 text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
            </div>

            <ProfileCard name={name} email={email} image={image} />

            <section className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">তথ্য</h2>
                <dl className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <dt className="w-24 shrink-0 text-gray-500">নাম</dt>
                        <dd className="font-medium">{name}</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <dt className="w-24 shrink-0 text-gray-500">ইমেইল</dt>
                        <dd className="break-all font-medium">{email}</dd>
                    </div>
                </dl>

                {/* আপডেট বাটন: আলাদা রুটে নিয়ে যায় */}
                <Link
                    href="/profile/update"
                    className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-800"
                >
                    তথ্য আপডেট করুন
                </Link>
            </section>
        </div>
    );
}