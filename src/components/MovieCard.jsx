import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const { id, title, poster_path, vote_average } = movie;
    const dispatch = useDispatch();
    const favoriteMovies = useSelector((state) => state.favorites.movies);
    const isFavorite = favoriteMovies.some((fav) => fav.id === id);

    const rating = Math.round(vote_average * 10) / 10;

    const ratingColor =
        vote_average >= 7.5 ? "text-emerald-400" :
            vote_average >= 5 ? "text-amber-400" :
                "text-rose-400";

    return (
        <Link to={`/movie/${id}`}>
            <div className="group relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer
                      transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60">

                {/* Poster */}
                <img
                    src={poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : "/src/assets/no-poster.svg"
                    }
                    alt={title}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient — stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent
                        opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Favorite button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        isFavorite ? dispatch(removeFavorite(movie)) : dispatch(addFavorite(movie));
                    }}
                    className={`absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full p-1.5
                      hover:scale-110 transition-all duration-200
                      ${isFavorite ? "text-rose-500" : "text-white/30 hover:text-rose-400"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>

                {/* Rating badge */}
                <div className={`absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm
                         rounded-full px-2 py-0.5 text-xs font-bold ${ratingColor}`}>
                    ★ {rating}
                </div>

                {/* Title — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-3
                        translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-semibold leading-snug line-clamp-2 tracking-wide">
                        {title}
                    </p>
                </div>

            </div>
        </Link>
    );
}

export default MovieCard;