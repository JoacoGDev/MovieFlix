import { describe, expect, it } from 'vitest';
import reducer, { addFavorite, removeFavorite } from './favoritesSlice';
import { render, renderHook } from '@testing-library/react';



describe('addFavorite', () => {
    const initialState = { movies: [] };
    it('Should return the new state', () => {
        const movies = reducer(initialState, addFavorite({ id: 1, title: "Batman", release: 1993 }));

        expect(movies.movies).toEqual([{ id: 1, title: "Batman", release: 1993 }]);
    })

})
describe('removeFavorite', () => {
    it('Should return the new state', () => {
        const initialState = { movies: [{ id: 1, title: "Batman", release: 1993 }, { id: 2, title: "Superman", release: 1994 }] };
        const movies = reducer(initialState, removeFavorite({ id: 1 }));

        expect(movies.movies).toEqual([{ id: 2, title: "Superman", release: 1994 }]);
    })

})