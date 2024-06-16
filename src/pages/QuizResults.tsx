import { Link, useLocation } from "react-router-dom";
import { APP_PATHS } from "../configs/RouterPaths";
import { generateResultMessage } from "../misc/misc";
import { useId } from "react";
interface IQuizResults {
    score: number;
    choices: Record<string, string>;
}

const QuizResults = () => {
    const { state } = useLocation();
    if (!state) return <div>Invalid entry</div>;

    const { score, choices } = state as IQuizResults;

    const choicesLength = Object.keys(choices).length;
    const ratio = score / choicesLength;
    const message = generateResultMessage(ratio);

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
                    <tr key={useId()}>
                        <th key={useId()}>{choice}</th>
                        <th key={useId()}>{choices[choice]}</th>
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
