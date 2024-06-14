import { useRouteError } from "react-router-dom";

interface RouteError {
    data: string;
    error: {
        columnNumber: number;
        fileName: string;
        lineNumber: number;
        message: string;
        stack: string;
    };
    internal: boolean;
    status: number;
    statusText: string;
}

const Error = () => {
    const error = useRouteError() as RouteError;
    console.log(error);
    return (
        <>
            <h1>Error {error.status}</h1>
            <p>{error.statusText}</p>
        </>
    );
};

export default Error;
