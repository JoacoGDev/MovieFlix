import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

function FavoritesPage() {

    const favoriteMovies = useSelector((state) => state.favorites.movies);

    return (
        <div className="min-h-screen bg-white px-6 py-10 font-sans">

            {/* Grid */}
            {favoriteMovies.length !== 0 && (
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {favoriteMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}

            {favoriteMovies.length === 0 && (
                <p className="text-center text-gray-400 text-sm tracking-wide animate-pulse">
                    We could start by watching something cool...
                </p>
            )}


        </div>
    );
}

export default FavoritesPage;