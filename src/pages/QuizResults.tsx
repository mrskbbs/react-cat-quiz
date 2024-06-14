import { useLocation } from "react-router-dom";
import { QuestionData } from "../components/QuizCard/QuizCard";

interface IQuizResults {
    score: number;
    questions: QuestionData[];
}

const QuizResults = () => {
    const { state } = useLocation();

    if (!state) {
        return <div>Invalid entry</div>;
    }
    const { score, questions } = state as IQuizResults;

    let message = "";
    const ratio = score / questions.length;
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
                    {score}/{questions.length}
                </h1>
                <p>{message}</p>
            </div>
            <div>
                <p>Here are your answers:</p>
                {questions.map((question) => {
                    const isCorrect = question.answers.includes(question.choice);
                    return (
                        <tr>
                            <th className={isCorrect ? "correct" : "wrong"}>{question.choice}</th>
                            <th className="correct">{question.answers.toString()}</th>
                        </tr>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizResults;
