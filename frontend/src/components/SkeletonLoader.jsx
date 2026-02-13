const SkeletonCard = () => (
    <div className="bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
        <div className="w-full aspect-square bg-slate-200 dark:bg-zinc-800 animate-pulse border-b-2 border-slate-950 dark:border-zinc-50" />
        <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-zinc-800 animate-pulse" />
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-zinc-800 animate-pulse" />
            <div className="pt-3 border-t-2 border-slate-200 dark:border-zinc-800 flex gap-2">
                <div className="h-10 flex-1 bg-slate-200 dark:bg-zinc-800 animate-pulse border-2 border-slate-300 dark:border-zinc-700" />
                <div className="h-10 flex-1 bg-slate-200 dark:bg-zinc-800 animate-pulse border-2 border-slate-300 dark:border-zinc-700" />
            </div>
        </div>
    </div>
);

const SkeletonLoader = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export default SkeletonLoader;
