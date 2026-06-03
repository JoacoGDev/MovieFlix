import MovieCard from "./MovieCard";

function Grid({ data, title }) {
    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-8 font-sans">
            {/* Section heading */}
            <div className="max-w-6xl mx-auto mb-6">
                <h2 className="text-white text-xl font-semibold tracking-tight">
                    {title}
                </h2>
                {data?.length > 0 && (
                    <p className="text-zinc-500 text-sm mt-1">
                        {data.length} titles
                    </p>
                )}
            </div>

            {/* Empty state */}
            {data?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <span className="text-5xl">🎬</span>
                    <p className="text-zinc-400 text-sm">No results</p>
                </div>
            )}

            {/* Grid */}
            {data?.length > 0 && (
                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {data.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Grid;