import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

function FavoritesPage() {
    const favoriteMovies = useSelector((state) => state.favorites.movies);

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-8 font-sans">

            {/* Section heading */}
            <div className="max-w-6xl mx-auto mb-6">
                <h2 className="text-white text-xl font-semibold tracking-tight">
                    My Favorites
                </h2>
                {favoriteMovies.length > 0 && (
                    <p className="text-zinc-500 text-sm mt-1">
                        {favoriteMovies.length} {favoriteMovies.length === 1 ? "title" : "titles"}
                    </p>
                )}
            </div>

            {/* Empty state */}
            {favoriteMovies.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <span className="text-5xl">🍿</span>
                    <p className="text-zinc-400 text-sm">Your list is empty</p>
                    <p className="text-zinc-600 text-xs">
                        Start adding movies you love
                    </p>
                </div>
            )}

            {/* Grid */}
            {favoriteMovies.length > 0 && (
                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {favoriteMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

        </div>
    );
}

export default FavoritesPage;