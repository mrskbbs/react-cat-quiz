import { Link } from "react-router-dom";
import APP_PATHS from "../configs/RouterPaths";

const Home = () => {
    return (
        <div>
            <h1>This is a cat quiz!</h1>
            <p>This quiz will show your true knowledge in cats</p>
            <Link to={APP_PATHS.quiz}>
                <button>Begin</button>
            </Link>
        </div>
    );
};
export default Home;
