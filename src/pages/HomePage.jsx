import useFetch from "../hooks/useFetch"
import { searchMovies, searchPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard"
import SearchBar from "../components/SearchBar";
import { useCallback, useEffect, useState } from "react";

function HomePage() {
    const [inputValue, setInputValue] = useState("");
    const [query, setQuery] = useState("");

    const fetchFn = useCallback(query ? () => searchMovies(query) : searchPopularMovies, [query]);
    const { data, isLoading, error } = useFetch(fetchFn);


    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(inputValue);
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue])

    return (
        <div className="min-h-screen bg-white px-6 py-10 font-sans">

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-10 flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    <span className="text-purple-500">Movie</span>App
                </h1>
                <SearchBar onSearch={setInputValue} />
            </div>

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