import { FunctionComponent, useRef, MutableRefObject, useState, useEffect } from "react";
import styles from "./SmartImage.module.css";

interface ISmartImage {
    path: string;
    paramsUrl?: {};
    deps: any[];
}

const SmartImage: FunctionComponent<ISmartImage> = ({ path, paramsUrl, deps }) => {
    const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchImage = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(path + new URLSearchParams(paramsUrl));
            const data = await response.json();

            const preload = new Image();
            preload.src = data.url === undefined ? data[0].url : data.url;
            preload.onload = () => {
                setIsLoading(false);
                imgRef.current.src = preload.src;
            };
        } catch (e) {
            setIsError(true);
        }
    };

    useEffect(() => {
        fetchImage();
    }, deps);

    if (isError) {
        return <h1>Error occured :/</h1>;
    }

    return (
        <>
            {isLoading && <p>Loading...</p>}
            <img
                className={isLoading ? styles.imageLoading : styles.image}
                ref={imgRef}
                alt="Image should be here :/"
            />
        </>
    );
};

export default SmartImage;
