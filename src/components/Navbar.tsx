import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api";
import { bnToday } from "@/lib/bn";
import AuthButtons from "./AuthButtons";
import CategoryNav from "./CategoryNav";

export default async function Navbar() {
    const categories = await getCategories();

    return (
        <header className="bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <Image
                        src="/logo-icon.png"
                        alt="বাজার দর"
                        width={112}
                        height={112}
                        className="h-12 w-12 shrink-0 rounded-2xl sm:h-14 sm:w-14"
                        priority
                    />
                    <span>
                        <span className="block text-2xl font-bold leading-tight text-[#1a2a1f] sm:text-3xl">
                            বাজার দর
                        </span>
                        <span className="block text-xs leading-tight text-gray-800 sm:text-base">
                            {bnToday()}
                        </span>
                    </span>
                </Link>
                <AuthButtons />
            </div>
            <CategoryNav categories={categories} />
        </header>
    );
}