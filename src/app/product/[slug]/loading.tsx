export default function Loading() {
    return (
        <div className="space-y-6 py-8">
            <div className="skeleton h-5 w-56" />
            <div className="flex items-center gap-5 rounded-3xl border border-gray-200 bg-white/80 p-6">
                <div className="skeleton h-20 w-20 rounded-2xl" />
                <div className="flex-1 space-y-3">
                    <div className="skeleton h-9 w-64" />
                    <div className="skeleton h-4 w-40" />
                    <div className="skeleton h-4 w-72" />
                </div>
                <div className="skeleton hidden h-28 w-36 rounded-2xl md:block" />
            </div>
            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white/80 p-6">
                <div className="skeleton h-8 w-48" />
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="skeleton h-28 rounded-2xl" />
                    <div className="skeleton h-28 rounded-2xl" />
                    <div className="skeleton h-28 rounded-2xl" />
                </div>
                <div className="skeleton h-64 rounded-2xl" />
            </div>
        </div>
    );
}