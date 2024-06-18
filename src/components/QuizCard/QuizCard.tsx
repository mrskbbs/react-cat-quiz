import { FunctionComponent, useContext } from "react";
import useGenerateQuestion from "../../hooks/useGenerateQuestion";
import { OptionMenu } from "../OptionMenu/OptionMenu";
import { QuizContext } from "../QuizCardContainer/QuizCardContainer";
import SmartImage from "../SmartImage/SmartImage";
import SubmitOption from "../SubmitOption/SubmitOption";
import OptionButton from "../OptionButton/OptionButton";
import API_KEYS from "../../configs/APIKeys";
import { API_PATHS } from "../../configs/RouterPaths";
import styles from "./QuizCard.module.css";

interface IQuizCard {
    target: string;
    text: string;
}

const QuizCard: FunctionComponent<IQuizCard> = ({ target, text }) => {
    const context = useContext(QuizContext);
    const { options, answer, answerIndex } = useGenerateQuestion(target, context.breeds);

    return (
        <>
            <p>
                {context.quizState.pagesPassed}/{context.quizState.maxPages}
            </p>
            <SmartImage
                path={API_PATHS.images}
                paramsUrl={{ breeds: context.breeds[answerIndex], api_key: API_KEYS.catAPI }}
                deps={[context.quizState.pagesPassed]}
            />
            <p className={styles.question}>{text}</p>
            <OptionMenu submitBtn={<SubmitOption answer={answer} />}>
                {options.map((option) => (
                    <OptionButton key={option} value={option} />
                ))}
            </OptionMenu>
        </>
    );
};

export default QuizCard;
