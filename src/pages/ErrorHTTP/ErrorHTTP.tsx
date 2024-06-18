import { Link, useRouteError } from "react-router-dom";
import { APP_PATHS } from "../../configs/RouterPaths";
import styles from "../ErrorStyles.module.css";

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

const ErrorHTTP = () => {
    const error = useRouteError() as RouteError;

    return (
        <div className={styles.container}>
            <h1>
                Error <span className={styles.errorCode}>{error.status}</span>
            </h1>
            <hr className={styles.underLine} />
            <p>{error.statusText}</p>
            <Link to={APP_PATHS.home}>
                <button className="buttonUi">Go to home</button>
            </Link>
        </div>
    );
};

export default ErrorHTTP;
