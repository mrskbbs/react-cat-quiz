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
    console.log(questions);
    return (
        <div>
            <div>
                <h1>
                    {score}/{questions.length}
                </h1>
                <p>Excelent results!</p>
            </div>
            <div>
                <p>Here are your answers:</p>
                {questions.map((question) => (
                    <div>
                        {question.choice} | {question.answers.toString()}{" "}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizResults;
