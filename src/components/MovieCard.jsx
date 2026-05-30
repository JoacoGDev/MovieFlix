function MovieCard({ id, title, rating, img }) {
    
    const ratingColor =
        rating >= 7.5 ? "text-emerald-400" :
            rating >= 5 ? "text-amber-400" :
                "text-rose-400";

    return (
        <div
            id={id}
            className="group relative w-48 rounded-xl overflow-hidden shadow-lg cursor-pointer
                 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
        >
            {/* Poster */}
            <img
                src={`https://image.tmdb.org/t/p/w500${img}`}
                alt={`${title}-picture`}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient overlay — always visible at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Rating badge */}
            <div className={`absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm
                       rounded-full px-2 py-0.5 text-xs font-bold ${ratingColor}`}>
                ★ {rating}
            </div>

            {/* Title */}
            <cite className="not-italic absolute bottom-0 left-0 right-0 px-3 py-3
                       text-white text-sm font-semibold leading-snug line-clamp-2 tracking-wide">
                {title}
            </cite>
        </div>
    );
}

export default MovieCard;