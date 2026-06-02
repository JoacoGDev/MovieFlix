import { API_BASE_URL } from "./config";


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`
    }
}

async function getPopularMovies() {
    const url = `${API_BASE_URL}/movie/popular`


    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;

}

async function getPopularShows() {
    const url = `${API_BASE_URL}/tv/popular`


    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;

}

async function searchMovies(query) {
    const url = `${API_BASE_URL}/search/movie?query=${query}`

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

async function getMovieById(id) {
    const url = `${API_BASE_URL}/movie/${id}`;

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;

}

async function getTrending() {
    const url = `${API_BASE_URL}/trending/all/week`;

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

async function getTopRatedMovies() {
    const url = `${API_BASE_URL}/movie/top_rated`;

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

export { getPopularMovies, searchMovies, getMovieById, getTopRatedMovies, getTrending, getPopularShows };