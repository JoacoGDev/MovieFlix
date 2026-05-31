import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: { movies: JSON.parse(localStorage.getItem("favorites")) || [] },
    reducers: {
        addFavorite: (state, action) => {
            state.movies.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload.id);
        }

    }


})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;