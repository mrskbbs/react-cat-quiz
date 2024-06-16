import { createContext, FunctionComponent, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { APP_PATHS } from "../../configs/RouterPaths";
import { IBreedJson } from "../../hooks/useGetBreeds";
import { randomInt } from "../../misc/misc";
import QuizCard from "../QuizCard/QuizCard";
import BREEDS from "../../data/Breeds";

export interface IQuizData {
    maxPages: number;
    pagesPassed: number;
    score: number;
    choices: Record<string, string>;
}
export interface IQuizContext {
    quizState: IQuizData;
    setQuizState: React.Dispatch<React.SetStateAction<IQuizData>>;
    breeds: IBreedJson[];
}

export const QuizContext = createContext({
    quizState: {} as IQuizData,
} as IQuizContext);

const variants = [
    {
        target: "name",
        text: "What breed is this cat?",
    },
    {
        target: "origin",
        text: "What is the origin of this cat breed?",
    },
    {
        target: "alt_names",
        text: "This cat is also known as...",
    },
];

const QuizCardContainer: FunctionComponent = () => {
    const { state } = useLocation();
    const [quizState, setQuizState] = useState({
        maxPages: 5,
        pagesPassed: 0,
        score: 0,
        choices: {},
    } as IQuizData);
    const randomIndex = randomInt(variants.length - 1);

    if (quizState.pagesPassed >= quizState.maxPages) {
        return (
            <Navigate
                to={`${APP_PATHS.quiz}/${APP_PATHS.quizResult}`}
                state={{ score: quizState.score, choices: quizState.choices }}
            />
        );
    }
    return (
        <QuizContext.Provider
            value={{
                quizState: quizState,
                setQuizState: setQuizState,
                //If user doesnt have preloaded breeds, we'll use harcoded ones
                breeds: !state ? BREEDS : state.breeds,
            }}
        >
            <QuizCard target={variants[randomIndex].target} text={variants[randomIndex].text} />
        </QuizContext.Provider>
    );
};

export default QuizCardContainer;
