import { Link, useLocation } from "react-router-dom";
import { APP_PATHS } from "../../configs/RouterPaths";
import { generateResultMessage } from "../../misc/misc";
import { useId } from "react";
import styles from "./QuizResults.module.css";
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
        <div className={styles.layout}>
            <div>
                <h1>
                    {score}/{choicesLength}
                </h1>
                <h1>{message}</h1>
            </div>
            <div>
                <p>Here are your answers:</p>
                <table>
                    <tbody>
                        {Object.keys(choices).map((choice: string) => (
                            <tr key={useId()} className={choices[choice] === choice ? styles.correct : styles.wrong}>
                                <th key={useId()}>{choice}</th>
                                <th key={useId()}>{choices[choice]}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to={APP_PATHS.home}>
                <button className="buttonUi">Go to home</button>
            </Link>
        </div>
    );
};

export default QuizResults;
