export default function Loading() {
    return (
        <div className="mx-auto max-w-3xl space-y-6 py-8">
            <div className="space-y-2">
                <div className="skeleton h-9 w-56" />
                <div className="skeleton h-4 w-72" />
            </div>
            <div className="flex items-center gap-5 rounded-3xl border border-gray-200 bg-white/80 p-6">
                <div className="skeleton h-20 w-20 rounded-2xl" />
                <div className="flex-1 space-y-3">
                    <div className="skeleton h-6 w-48" />
                    <div className="skeleton h-4 w-64" />
                </div>
            </div>
            <div className="skeleton h-48 rounded-3xl" />
        </div>
    );
}