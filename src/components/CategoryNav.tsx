"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
    const pathname = usePathname();

    return (
        <nav className="border-t border-gray-100">
            <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
                {categories.map((c) => {
                    const href = `/category/${c.slug}`;
                    const active = pathname === href;
                    return (
                        <li key={c.slug} className="shrink-0">
                            <Link
                                href={href}
                                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${active
                                        ? "bg-green-700 text-white shadow"
                                        : "text-gray-700 hover:bg-green-50"
                                    }`}
                            >
                                <span>{c.icon}</span>
                                {c.nameBn}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}