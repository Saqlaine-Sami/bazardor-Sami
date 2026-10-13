const BASE_URLS = [
    "https://openapi.programming-hero.com/api/bazardor",
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];

// একটি URL কাজ না করলে পরেরটা চেষ্টা করবে
async function fetchFromApi<T>(path: string): Promise<T> {
    let lastError: unknown;
    for (const base of BASE_URLS) {
        try {
            const res = await fetch(`${base}${path}`, { cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return (await res.json()) as T;
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError;
}

export const getProducts = (category?: string) =>
    fetchFromApi<unknown>(
        category ? `/products?category=${encodeURIComponent(category)}` : "/products"
    );

export const getProduct = (id: string) =>
    fetchFromApi<unknown>(`/products/${encodeURIComponent(id)}`);

export const getCategories = () => fetchFromApi<unknown>("/categories");

export const getCategory = (slug: string) =>
    fetchFromApi<unknown>(`/categories/${encodeURIComponent(slug)}`);