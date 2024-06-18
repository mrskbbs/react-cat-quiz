import { Link } from "react-router-dom";
import { APP_PATHS } from "../../configs/RouterPaths";
import useGetBreeds from "../../hooks/useGetBreeds";
import styles from "./Home.module.css";

const Home = () => {
    const { breeds, isError } = useGetBreeds();
    if (isError) {
        return <h1>Error occured, failed to load cat data :/</h1>;
    }
    return (
        <div className={styles.container}>
            <h1>This is a cat quiz!</h1>
            <hr />
            <p>This quiz will show your true knowledge in cats</p>
            <Link to={APP_PATHS.quiz} state={{ breeds: breeds }}>
                <button className="buttonUi">Begin</button>
            </Link>
        </div>
    );
};
export default Home;
