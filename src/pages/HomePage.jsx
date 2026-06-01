import useFetch from "../hooks/useFetch"
import { searchMovies, searchPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard"
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function HomePage() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const fetchFn = useCallback(query ? () => searchMovies(query) : searchPopularMovies, [query]);
    const { data, isLoading, error } = useFetch(fetchFn);

    return (
        <div className="min-h-screen bg-white px-6 py-10 font-sans">

            {/* States */}
            {isLoading && (
                <p className="text-center text-gray-400 text-sm tracking-wide animate-pulse">
                    I think we might have that
                </p>
            )}
            {error && (
                <p className="text-center text-red-400 text-sm">
                    {error.message}
                </p>
            )}

            {/* Grid */}
            {data && (
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {data.results.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}

            {data?.results?.length === 0 && (
                <p className="text-center text-gray-400 text-sm tracking-wide animate-pulse">
                    Sorry, we couldn't find that movie
                </p>
            )}


        </div>
    );
}

export default HomePage;