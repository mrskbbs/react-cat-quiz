import { Link } from "react-router-dom";
import { APP_PATHS } from "../configs/RouterPaths";
import useGetBreeds from "../hooks/useGetBreeds";

const Home = () => {
    const { breeds, isError } = useGetBreeds();
    if (isError) {
        return <h1>Error occured, failed to load cat data :/</h1>;
    }
    return (
        <div>
            <h1>This is a cat quiz!</h1>
            <p>This quiz will show your true knowledge in cats</p>
            <Link to={APP_PATHS.quiz} state={{ breeds: breeds }}>
                <button>Begin</button>
            </Link>
        </div>
    );
};
export default Home;
