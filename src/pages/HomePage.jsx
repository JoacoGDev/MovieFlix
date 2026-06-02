import useFetch from "../hooks/useFetch"
import { searchMovies, getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard"
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

function HomePage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const fetchFn = useCallback(
        query ? () => searchMovies(query) : getPopularMovies,
        [query]
    );

    const { data, isLoading, error } = useFetch(fetchFn);

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-8 font-sans">

            {/* Section heading */}
            <div className="max-w-6xl mx-auto mb-6">
                <h2 className="text-white text-xl font-semibold tracking-tight">
                    {query ? (
                        <>
                            Results for{" "}
                            <span className="text-sky-400">"{query}"</span>
                        </>
                    ) : (
                        "Popular right now"
                    )}
                </h2>
                {data && !isLoading && (
                    <p className="text-zinc-500 text-sm mt-1">
                        {data.results.length} titles
                    </p>
                )}
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-zinc-500 text-sm tracking-widest uppercase animate-pulse">
                        Loading...
                    </p>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-400 text-sm mt-20">
                    {error.message}
                </p>
            )}

            {/* Empty state */}
            {data?.results?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <span className="text-5xl">🎬</span>
                    <p className="text-zinc-400 text-sm">
                        No results for <span className="text-white">"{query}"</span>
                    </p>
                </div>
            )}

            {/* Grid */}
            {data && data.results.length > 0 && (
                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {data.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

        </div>
    );
}

export default HomePage;