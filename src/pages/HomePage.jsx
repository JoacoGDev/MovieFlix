import { getTrending, getPopularMovies, getPopularShows, getTopRatedMovies, searchMulti } from "../services/tmdb";
import Carousel from "../components/Carousel";
import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Grid from "../components/Grid";


function HomePage() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const searchFunction = useCallback(query ? () => searchMulti(query) : null, [query]);

    const { data, isLoading, error } = useFetch(searchFunction);

    const carouselData = [{ title: "Trending Now", fetch: getTrending },
    { title: "Popular Movies", fetch: getPopularMovies },
    { title: "Popular Shows", fetch: getPopularShows },
    { title: "Top Rated Movies", fetch: getTopRatedMovies }];


    return (
        <div className="min-h-screen bg-zinc-950 px-6 pt-25 pb-8">



            {query.length === 0 ? carouselData.map((carousel) => (
                <Carousel key={carousel.title} title={carousel.title} fetchFunction={carousel.fetch} />
            )) : query && data &&
            <Grid title={`Results for ${query}`} data={data.results} />
            }
        </div>

    );
}

export default HomePage;