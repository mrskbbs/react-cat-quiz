import { createContext, FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { randomInt } from "../misc/misc";
import QuizCard from "../components/QuizCard/QuizCard";
import { Navigate, useLocation } from "react-router-dom";
import { APP_PATHS } from "../configs/RouterPaths";
import { IBreedJson } from "../hooks/useGetBreeds";

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

const QuizCardContainer = () => {
    const { breeds } = useLocation().state;
    const [quizState, setQuizState] = useState({
        maxPages: 5,
        pagesPassed: 0,
        score: 0,
        choices: {},
    } as IQuizData);
    const variants = [
        {
            target: "name",
            text: "What breed is this cat?",
        },
        {
            target: "origin",
            text: "Where is the origin of this cat?",
        },
        {
            target: "alt_names",
            text: "This cat is also known as",
        },
    ];
    const randomIndex = randomInt(variants.length - 1);

    if (quizState.pagesPassed >= quizState.maxPages) {
        return (
            <Navigate to={APP_PATHS.quiz + "/results"} state={{ score: quizState.score, choices: quizState.choices }} />
        );
    }
    return (
        <QuizContext.Provider value={{ quizState: quizState, setQuizState: setQuizState, breeds: breeds }}>
            <QuizCard target={variants[randomIndex].target} text={variants[randomIndex].text} />
        </QuizContext.Provider>
    );
};

const Quiz: FunctionComponent = () => {
    return (
        <>
            <h1>This is quiz</h1>
            <QuizCardContainer />
        </>
    );
};

export default Quiz;
