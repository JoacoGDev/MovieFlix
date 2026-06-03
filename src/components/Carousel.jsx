import { useCallback } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";

function Carousel({ title, fetchFunction }) {
    const fetchFn = useCallback(() => fetchFunction(), [fetchFunction]);
    const { data, error, isLoading } = useFetch(fetchFn);

    return (
        <div className="mb-10">
            {/* Section Title */}
            <h2 className="text-white text-lg font-semibold tracking-widest uppercase mb-4 px-1 border-l-4 border-red-600 pl-3">
                {title}
            </h2>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center h-48">
                    <p className="text-zinc-500 text-xs tracking-widest uppercase animate-pulse">
                        Loading...
                    </p>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-400 text-xs tracking-wide mt-10">
                    {error.message}
                </p>
            )}

            {/* Carousel */}
            {data && data.results.length > 0 && (
                <div className="relative">
                    <div
                        className="flex overflow-x-auto gap-4 pb-4 px-1
              scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700
              scroll-smooth snap-x snap-mandatory"
                    >
                        {data.results.map((movie) => (
                            <div key={movie.id} className="snap-start shrink-0">
                                <MovieCard movie={movie} className={"snap - start shrink-0 w-36"} />
                            </div>
                        ))}
                    </div>

                    {/* Fade edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-zinc-950 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-950 to-transparent" />
                </div>
            )}
        </div>
    );
}

export default Carousel;