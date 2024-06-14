import { useLocation } from "react-router-dom";

const QuizResults = () => {
    const { resultsState } = useLocation();

    if (!resultsState) {
        return <div>Invalid entry</div>;
    }

    return (
        <div>
            <div>
                <h1>5/5</h1>
                <p>Excelent results!</p>
            </div>
            <div>
                <p>Here are your answers:</p>
            </div>
        </div>
    );
};

export default QuizResults;
