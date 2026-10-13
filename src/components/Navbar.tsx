import Link from "next/link";
import { getCategories } from "@/lib/api";
import { bnToday } from "@/lib/bn";
import AuthButtons from "./AuthButtons";
import CategoryNav from "./CategoryNav";

export default async function Navbar() {
    const categories = await getCategories();

    return (
        <header className="bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-green-700 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                        🛒
                    </span>
                    <span>
                        <span className="block text-lg font-bold leading-tight sm:text-xl">
                            বাজার দর
                        </span>
                        <span className="block text-xs text-gray-600">{bnToday()}</span>
                    </span>
                </Link>
                <AuthButtons />
            </div>
            <CategoryNav categories={categories} />
        </header>
    );
}