import { useRef } from "react";
import { filterEmptyEntries, getRandomBreedIndex, randomInt, shuffle } from "../misc/misc";
import { IBreedJson } from "./useGetBreeds";

interface IQuestionData {
    answer: string;
    options: string[];
}

function useGenerateQuestion(target: string, breeds: IBreedJson[]) {
    const question = useRef({} as IQuestionData);
    question.current = {
        answer: "",
        options: [],
    };

    const answerIndex = getRandomBreedIndex(target, breeds);
    question.current.answer = breeds[answerIndex][target] as string;
    question.current.options.push(question.current.answer);

    for (let i = 0; i < 3; i++) {
        let randomOption = breeds[randomInt(breeds.length - 1)][target] as string;
        while (filterEmptyEntries(randomOption) || question.current.options.includes(randomOption)) {
            randomOption = breeds[randomInt(breeds.length - 1)][target] as string;
        }
        question.current.options.push(randomOption);
    }

    shuffle(question.current.options);

    return {
        options: question.current.options,
        answer: question.current.answer,
        answerIndex: answerIndex,
    };
}

export default useGenerateQuestion;
