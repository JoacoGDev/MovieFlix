import { render, renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";
import { expect } from "vitest";


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

});
