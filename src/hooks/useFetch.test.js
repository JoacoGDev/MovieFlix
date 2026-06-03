import { render, renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";
import { expect, it } from "vitest";

const neverResolves = () => new Promise(() => { });
const alwaysRejects = () => Promise.reject(new Error("fetch failed"));
const alwaysSucces = () => Promise.resolve({ results: [{ id: 1, title: "Batman" }] });

describe('useFetch', () => {
    it('Should return  isLoading true while fetching', () => {
        const { result } = renderHook(() => useFetch(neverResolves));

        expect(result.current.isLoading).toBe(true);
    });

    it('Should return error if fetching fails', async () => {
        const { result } = renderHook(() => useFetch(alwaysRejects));

        await waitFor(() => {
            expect(result.current.error).toBeInstanceOf(Error);
            expect(result.current.error.message).toBe("fetch failed");
        })
    })

    it('Should return data if fetching success', async () => {
        const { result } = renderHook(() => useFetch(alwaysSucces));

        await waitFor(() => {
            expect(result.current.data).toEqual({ results: [{ id: 1, title: "Batman" }] });
        })
    })

    it('It should not fetch when fetchFunction is null', () => {
        const { result } = renderHook(() => useFetch(null));

        expect(result.current.data).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();

    })

});
