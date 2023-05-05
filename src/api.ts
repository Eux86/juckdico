import { useState,useEffect } from 'react';

const baseUrl = '/';

const NOTFOUNDERROR = "not-found";

export const useFetchUser = (userId: string) => {
    const result = useFetch<{ serialNumber: string; music: string }>(`${baseUrl}user/${userId}/music`);
    if (result.error === NOTFOUNDERROR) {
        return {
            ...result,
            userNotFound: true,
        }
    }
    return {
        ...result,
        userNotFound: false,
    };
}

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(url, {headers: {'ngrok-skip-browser-warning': 'true'}});
                const result = await response.json();
                if (result.status === 404) {
                    setError(NOTFOUNDERROR);
                    setIsLoading(false);
                } else {
                    setData(result);
                    setIsLoading(false);
                }
            } catch (error) {
                setError((error as any)?.message || error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};

export function useSaveData() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = (`${baseUrl}user/register`);

    const saveData = async (formData: { serialNumber: string, music: string }): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            setError(error as any);
        } finally {
            setIsLoading(false);
        }
    };

    return {data, isLoading, error, saveData};
}