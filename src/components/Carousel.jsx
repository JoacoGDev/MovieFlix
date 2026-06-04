import { useCallback, useRef } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";

function Carousel({ title, fetchFunction, initialMovies }) {
    const fetchFn = useCallback(fetchFunction ? () => fetchFunction() : null, [fetchFunction]);
    const { data, error, isLoading } = useFetch(fetchFn);

    const movies = fetchFunction ? data?.results : initialMovies;

    const carouselRef = useRef(null);

    const scroll = (dir) => {
        carouselRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
    };

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

            {movies && movies.length > 0 && (
                <div className="relative group">

                    {/* Botón izquierda */}
                    <button
                        onClick={() => scroll(-1)}
                        className="absolute left-0 inset-y-0 z-10 w-10
                 bg-gradient-to-r from-zinc-950 to-transparent
                 text-white opacity-0 group-hover:opacity-100
                 transition-opacity flex items-center justify-center"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Carrusel */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto gap-4 pb-4 px-1
                 scrollbar-none scroll-smooth snap-x snap-mandatory"
                    >
                        {movies.map((movie) => (
                            <div key={movie.id} className="snap-start shrink-0">
                                <MovieCard movie={movie} className="w-36" />
                            </div>
                        ))}
                    </div>

                    {/* Botón derecha */}
                    <button
                        onClick={() => scroll(1)}
                        className="absolute right-0 inset-y-0 z-10 w-10
                 bg-gradient-to-l from-zinc-950 to-transparent
                 text-white opacity-0 group-hover:opacity-100
                 transition-opacity flex items-center justify-center"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                </div>
            )}
        </div>
    );
}

export default Carousel;