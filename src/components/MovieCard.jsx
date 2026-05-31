import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {

    const { id, title, poster_path, vote_average } = movie;

    const dispatch = useDispatch();
    const favoriteMovies = useSelector((state) => state.favorites.movies);

    const isFavorite = favoriteMovies.some((fav) => fav.id === id);

    const ratingColor =
        vote_average >= 7.5 ? "text-emerald-400" :
            vote_average >= 5 ? "text-amber-400" :
                "text-rose-400";

    return (

        <Link to={`/movie/${id}`}>
            <div
                id={id}
                className="group relative w-48 rounded-xl overflow-hidden shadow-lg cursor-pointer
                 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
                {/* Poster */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={`${title}-picture`}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay — always visible at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Favorites button */}
                <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); isFavorite ? dispatch(removeFavorite(movie)) : dispatch(addFavorite(movie))}} className={`absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full p-1.5
                   hover:scale-110 transition-all duration-200
                   ${isFavorite ? "text-rose-500" : "text-white/20 hover:text-rose-400/70"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>

                {/* Rating badge */}
                <div className={`absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm
                       rounded-full px-2 py-0.5 text-xs font-bold ${ratingColor}`}>
                    ★ {vote_average}
                </div>

                {/* Title */}
                <cite className="not-italic absolute bottom-0 left-0 right-0 px-3 py-3
                       text-white text-sm font-semibold leading-snug line-clamp-2 tracking-wide">
                    {title}
                </cite>
            </div>
        </Link>
    );
}

export default MovieCard;