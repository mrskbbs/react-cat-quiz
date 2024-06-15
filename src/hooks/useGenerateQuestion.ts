import { useRef } from "react";
import BREEDS from "../data/Breeds";
import { getRandomBreedIndex, randomInt, shuffle } from "../misc/misc";

interface IQuestionData {
    answer: string;
    options: string[];
}

function useGenerateQuestion(target: string) {
    // const question = useRef({} as IQuestionData);
    const question: IQuestionData = {
        answer: "",
        options: [],
    };

    const answerIndex = getRandomBreedIndex(target);
    question.answer = BREEDS[answerIndex][target] as string;
    question.options.push(question.answer);

    for (let i = 0; i < 3; i++) {
        let randomOption = BREEDS[randomInt(BREEDS.length - 1)][target] as string;
        while (
            randomOption === undefined ||
            randomOption.replace(" ", "") === "" ||
            question.options.includes(randomOption)
        ) {
            randomOption = BREEDS[randomInt(BREEDS.length - 1)][target] as string;
        }
        question.options.push(randomOption);
    }

    shuffle(question.options);

    return {
        options: question.options,
        answer: question.answer,
        answerIndex: answerIndex,
    };
}

export default useGenerateQuestion;
