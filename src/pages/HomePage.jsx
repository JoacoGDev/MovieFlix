import { getTrending, getPopularMovies, getPopularShows, getTopRatedMovies, searchMulti } from "../services/tmdb";
import Carousel from "../components/Carousel";
import Hero from "../components/Hero";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Grid from "../components/Grid";

function HomePage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const searchFn = useCallback(query ? () => searchMulti(query) : null, [query]);
    const { data: searchData, isLoading: searchIsLoading, error: searchError } = useFetch(searchFn);

    const trendingFn = useCallback(() => getTrending(), []);
    const { data: trendingData, isLoading: trendingIsLoading, error: trendingError } = useFetch(trendingFn);

    const carouselData = [
        { title: "Popular Movies", fetch: getPopularMovies },
        { title: "Popular Shows", fetch: getPopularShows },
        { title: "Top Rated Movies", fetch: getTopRatedMovies },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 pb-8">
            {query ? (
                <div className="px-6 pt-25">
                    {searchIsLoading && <p className="text-zinc-400 pt-10">Searching...</p>}
                    {searchError && <p className="text-red-400 pt-10">Something went wrong.</p>}
                    {searchData && <Grid title={`Results for "${query}"`} data={searchData.results} />}
                </div>
            ) : (
                <>
                    {trendingIsLoading && <div className="w-full h-[56vw] max-h-[80vh] min-h-[400px] bg-zinc-900 animate-pulse" />}
                    {trendingError && <div className="w-full h-[56vw] max-h-[80vh] min-h-[400px] bg-zinc-900 flex items-center justify-center text-zinc-500">Failed to load</div>}
                    {trendingData && <Hero content={trendingData.results[0]} />}
                    <div className="px-6 space-y-8 mt-8">
                        <Carousel initialMovies={trendingData?.results} key={"Trending Now"} title={"Trending Now"} />
                    </div>
                    <div className="px-6 space-y-8 mt-8">
                        {carouselData.map((carousel) => (
                            <Carousel key={carousel.title} title={carousel.title} fetchFunction={carousel.fetch} />
                        ))}
                    </div>
                </>
            )
            }
        </div >
    );
}

export default HomePage;