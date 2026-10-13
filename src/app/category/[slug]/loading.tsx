import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
    return (
        <div className="space-y-6 py-8">
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-white/80 px-6 py-6">
                <div className="skeleton h-14 w-14 rounded-full" />
                <div className="space-y-2">
                    <div className="skeleton h-8 w-32" />
                    <div className="skeleton h-4 w-48" />
                </div>
            </div>
            <div className="skeleton h-16 w-full rounded-2xl" />
            <ProductGridSkeleton count={6} />
        </div>
    );
}