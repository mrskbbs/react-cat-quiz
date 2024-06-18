import { Link } from "react-router-dom";
import { APP_PATHS } from "../../configs/RouterPaths";
import styles from "../ErrorStyles.module.css";

const ErrorInternal = () => {
    return (
        <div className={styles.container}>
            <h1>Something went wrong</h1>
            <hr className={styles.underLine} />
            <p>We're sorry, but something unexpected happened</p>
            <Link to={APP_PATHS.home}>
                <button className="buttonUi">Go to home</button>
            </Link>
        </div>
    );
};

export default ErrorInternal;
