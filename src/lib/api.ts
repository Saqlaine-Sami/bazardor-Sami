import type { Category, Product } from "./types";

const BASE_URLS = [
    "https://openapi.programming-hero.com/api/bazardor",
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];

// একটি URL কাজ না করলে পরেরটা চেষ্টা করবে (৫ মিনিট cache)
async function fetchFromApi(path: string): Promise<unknown> {
    let lastError: unknown;
    for (const base of BASE_URLS) {
        try {
            const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError;
}

// Response সরাসরি array হোক বা { data: [...] } আকারে, দুটোই চলবে
function toArray<T>(json: unknown): T[] {
    if (Array.isArray(json)) return json as T[];
    if (json && typeof json === "object") {
        const obj = json as Record<string, unknown>;
        for (const key of ["data", "products", "items"]) {
            if (Array.isArray(obj[key])) return obj[key] as T[];
        }
    }
    return [];
}

export async function getProducts(category?: string): Promise<Product[]> {
    const path = category
        ? `/products?category=${encodeURIComponent(category)}`
        : "/products";
    return toArray<Product>(await fetchFromApi(path));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const products = await getProducts();
    return products.find((p) => p.slug === slug) ?? null;
}

// প্রোডাক্ট থেকেই ক্যাটাগরির তালিকা বানানো হচ্ছে (প্রথম দেখা ক্রম অনুযায়ী)
export async function getCategories(): Promise<Category[]> {
    try {
        const products = await getProducts();
        const map = new Map<string, Category>();
        for (const p of products) {
            if (!map.has(p.category)) {
                map.set(p.category, {
                    slug: p.category,
                    nameBn: p.categoryNameBn,
                    icon: p.categoryIcon,
                });
            }
        }
        return [...map.values()];
    } catch {
        return [];
    }
}