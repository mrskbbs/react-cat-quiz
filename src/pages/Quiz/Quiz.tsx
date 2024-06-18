import { FunctionComponent } from "react";
import QuizCardContainer from "../../components/QuizCardContainer/QuizCardContainer";
import styles from "./Quiz.module.css";

const Quiz: FunctionComponent = () => {
    return (
        <div className={styles.background}>
            <div className={styles.quizCardContainer}>
                <QuizCardContainer />
            </div>
        </div>
    );
};

export default Quiz;
