import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMovieById } from "../services/tmdb";
import { useCallback } from "react";

function DetailPage() {
    const { id } = useParams();
    const fetchFn = useCallback(() => getMovieById(id), [id]);
    const { data, isLoading, error } = useFetch(fetchFn);

    const rating = data?.vote_average ? Math.round(data.vote_average * 10) / 10 : null;
    const year = data?.release_date ? data.release_date.split("-")[0] : null;

    const formatRuntime = (mins) => {
        if (!mins) return null;
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h}h ${m}m`;
    };

    const formatMoney = (n) =>
        n ? `$${(n / 1_000_000).toFixed(1)}M` : null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">

            {/* Backdrop */}
            {data?.backdrop_path && (
                <div className="relative h-72 w-full overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
                        alt=""
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
                </div>
            )}

            {/* Loading */}
            {isLoading && (
                <p className="text-center text-zinc-500 text-sm tracking-widest uppercase animate-pulse mt-32">
                    Finding that for you...
                </p>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-400 text-sm mt-32">{error.message}</p>
            )}

            {/* Content */}
            {data && (
                <div className="max-w-4xl mx-auto px-4 pb-16 -mt-24 relative z-10">
                    <div className="flex flex-col md:flex-row gap-10 items-start">

                        {/* Poster */}
                        <div className="shrink-0">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                                alt={data.title}
                                className="w-48 rounded-lg shadow-2xl shadow-black/60 ring-1 ring-white/10"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-4 pt-2">

                            {/* Title + tagline */}
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight leading-tight text-white">
                                    {data.title}
                                </h1>
                                {data.tagline && (
                                    <p className="text-zinc-400 italic text-sm mt-1">{data.tagline}</p>
                                )}
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                                {year && <span>{year}</span>}
                                {data.runtime > 0 && (
                                    <>
                                        <span className="text-zinc-600">·</span>
                                        <span>{formatRuntime(data.runtime)}</span>
                                    </>
                                )}
                                {data.status && (
                                    <>
                                        <span className="text-zinc-600">·</span>
                                        <span className="text-xs uppercase tracking-widest text-zinc-500">
                                            {data.status}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Genres */}
                            {data.genres?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.genres.map((g) => (
                                        <span
                                            key={g.id}
                                            className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-zinc-300 tracking-wide"
                                        >
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Rating */}
                            {rating && (
                                <div className="flex items-center gap-2">
                                    <span className="text-amber-400 text-lg">★</span>
                                    <span className="text-white font-semibold text-lg">{rating}</span>
                                    <span className="text-zinc-600 text-sm">/ 10</span>
                                    {data.vote_count && (
                                        <span className="text-zinc-600 text-xs">
                                            ({data.vote_count.toLocaleString()} votes)
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="border-t border-zinc-800 w-16" />

                            {/* Overview */}
                            {data.overview && (
                                <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">
                                    {data.overview}
                                </p>
                            )}

                            {/* Budget / Revenue */}
                            {(data.budget > 0 || data.revenue > 0) && (
                                <div className="flex gap-6 text-sm">
                                    {data.budget > 0 && (
                                        <div>
                                            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Budget</p>
                                            <p className="text-zinc-200 font-medium">{formatMoney(data.budget)}</p>
                                        </div>
                                    )}
                                    {data.revenue > 0 && (
                                        <div>
                                            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Revenue</p>
                                            <p className="text-zinc-200 font-medium">{formatMoney(data.revenue)}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Production companies */}
                            {data.production_companies?.length > 0 && (
                                <div className="flex flex-wrap gap-3 pt-2">
                                    {data.production_companies.map((c) =>
                                        c.logo_path ? (
                                            <img
                                                key={c.id}
                                                src={`https://image.tmdb.org/t/p/w92${c.logo_path}`}
                                                alt={c.name}
                                                title={c.name}
                                                className="h-6 object-contain opacity-50 hover:opacity-80 transition-opacity invert"
                                            />
                                        ) : (
                                            <span key={c.id} className="text-xs text-zinc-600">{c.name}</span>
                                        )
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailPage;