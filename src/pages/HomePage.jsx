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

        <div>

            <div>
                <SearchBar onSearch={setInputValue}></SearchBar>
            </div>

            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}

                {data && data.results.map((movie) => (
                    <MovieCard key={movie.id} id={movie.id} title={movie.title} rating={movie.vote_average} img={movie.poster_path} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;