import { FunctionComponent, MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../../pages/Quiz";
import { OptionMenu, Option, SubmitOption } from "../OptionMenu/OptionMenu";
import useGenerateQuestion from "../../hooks/useGenerateQuestion";
import API_KEYS from "../../configs/APIKeys";
import BREEDS from "../../data/Breeds";
import styles from "./QuizCard.module.css";

interface IQuizCard {
    target: string;
    text: string;
}

const SmartImage: FunctionComponent<{ answerIndex: number }> = ({ answerIndex }) => {
    const context = useContext(QuizContext);
    const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let response = await fetch(
                    "https://api.thecatapi.com/v1/images/search?" +
                        new URLSearchParams({
                            breed: BREEDS[answerIndex].name,
                            api_key: API_KEYS.catAPI,
                        })
                );

                const data = (await response.json())[0];
                imgRef.current.src = data.url;
                setIsLoading(false);
            } catch (e) {
                setIsError(true);
            }
        };
        fetchData();
    }, [context.quizState.pagesPassed]);

    if (isError) {
        return <h1>Error occured :/</h1>;
    }
    return (
        <>
            {isLoading && <p>Loading...</p>}
            <img
                className={isLoading ? styles.imageLoading : styles.image}
                ref={imgRef}
                alt="Cat image should be here"
            />
        </>
    );
};

const QuizCard: FunctionComponent<IQuizCard> = ({ target, text }) => {
    const context = useContext(QuizContext);
    const { options, answer, answerIndex } = useGenerateQuestion(target);

    return (
        <div>
            <p>
                Pages passed {context.quizState.pagesPassed}/{context.quizState.maxPages}
            </p>
            <SmartImage answerIndex={answerIndex} />
            <p>{text}</p>
            <OptionMenu>
                <div>
                    {options.map((option) => (
                        <Option key={option} value={option} />
                    ))}
                </div>
                <SubmitOption answer={answer} />
            </OptionMenu>
        </div>
    );
};

export default QuizCard;
