import { useEffect, useRef, useState } from "react";
import { API_PATHS } from "../configs/RouterPaths";

export interface IBreedJson {
    [key: string]: any;
}

function useGetBreeds() {
    const [isError, setIsError] = useState(false);
    const [breeds, setBreeds] = useState([] as IBreedJson[]);
    const fetchBreeds = async () => {
        try {
            const responce = await fetch(API_PATHS.breeds);
            if (!responce.ok) throw Error;

            const data: any = await responce.json();
            if (data === undefined || data.length === 0) throw Error;

            setBreeds(() => {
                return [...(data as IBreedJson[])];
            });
        } catch (e) {
            setIsError(true);
        }
    };
    useEffect(() => {
        fetchBreeds();
    }, []);

    return {
        breeds: breeds,
        isError: isError,
    };
}

export default useGetBreeds;
