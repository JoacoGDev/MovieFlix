import { getTrending, getPopularMovies, getPopularShows, getTopRatedMovies } from "../services/tmdb";
import Carousel from "../components/Carousel";

function HomePage() {

    const carouselData = [{ title: "Trending Now", fetch: getTrending },
    { title: "Popular Movies", fetch: getPopularMovies },
    { title: "Popular Shows", fetch: getPopularShows },
    { title: "Top Rated Movies", fetch: getTopRatedMovies }];

    return (
        <div className="min-h-screen bg-zinc-950 px-6 pt-25 pb-8">

            {carouselData.map((carousel) => (
                <Carousel key={carousel.title} title={carousel.title} fetchFunction={carousel.fetch} />
            ))}
        </div>

    );
}

export default HomePage;