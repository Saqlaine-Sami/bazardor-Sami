export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-white/80 p-5"
                >
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-14 w-14 shrink-0 rounded-xl" />
                        <div className="flex-1 space-y-2">
                            <div className="skeleton h-5 w-2/3" />
                            <div className="skeleton h-4 w-1/3" />
                        </div>
                    </div>
                    <div className="mt-5 space-y-2">
                        <div className="skeleton h-4 w-20" />
                        <div className="flex items-center justify-between">
                            <div className="skeleton h-8 w-28" />
                            <div className="skeleton h-7 w-16 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}