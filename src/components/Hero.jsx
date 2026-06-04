import { Link } from "react-router-dom";

function Hero({ content }) {
    if (!content) return <p className="text-zinc-400 p-8">Loading...</p>;

    return (
        <div className="relative w-full h-[56vw] max-h-[80vh] min-h-[400px]">

            {/* Backdrop */}
            <img
                src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                alt={content.title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {content.title}
                </h1>
                <p className="text-sm md:text-base text-zinc-300 line-clamp-3 mb-6">
                    {content.overview}
                </p>
                <div className="flex gap-3">
                    <Link to={`/movie/${content.id}`}>
                        <button className="flex items-center gap-2 bg-zinc-600/70 text-white font-semibold px-6 py-2 rounded hover:bg-zinc-600 transition-colors backdrop-blur-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                            </svg>
                            More Info
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Hero;