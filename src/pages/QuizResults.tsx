import { Link, useLocation } from "react-router-dom";
import APP_PATHS from "../configs/RouterPaths";
interface IQuizResults {
    score: number;
    choices: Record<string, string>;
}

const QuizResults = () => {
    const { state } = useLocation();

    if (!state) {
        return <div>Invalid entry</div>;
    }
    const { score, choices } = state as IQuizResults;

    let message = "";
    const choicesLength = Object.keys(choices).length;
    const ratio = score / choicesLength;
    if (ratio === 1.0) {
        message = "Excelent! You know everything about cats!";
    } else if (ratio >= 0.75) {
        message = "Impressive! But there's still a room for improvement";
    } else if (ratio >= 0.5) {
        message = "Not bad! However I'd study more about cats if I were you";
    } else if (ratio >= 0.25) {
        message = "It's alright, next time you'll do better";
    } else {
        message = "Clearly you're a dog person";
    }

    return (
        <div>
            <div>
                <h1>
                    {score}/{choicesLength}
                </h1>
                <p>{message}</p>
            </div>
            <div>
                <p>Here are your answers:</p>
                {Object.keys(choices).map((choice: string) => (
                    <tr>
                        <th>{choice}</th>
                        <th>{choices[choice]}</th>
                    </tr>
                ))}
            </div>
            <Link to={APP_PATHS.home}>
                <button>Go to home</button>
            </Link>
        </div>
    );
};

export default QuizResults;
