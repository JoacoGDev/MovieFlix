import { useEffect, useState } from "react";

function useFetch(fetchFunction) {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {

        if (!fetchFunction) {
            setIsLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                setIsLoading(true);
                const response = await fetchFunction();

                setData(response);
                setError(null);
            } catch (error) {
                setData(null);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }


        loadData();
    }, [fetchFunction])

    return { isLoading, error, data };
}

export default useFetch;