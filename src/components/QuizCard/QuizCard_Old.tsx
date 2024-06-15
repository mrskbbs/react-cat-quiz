import { useContext, useRef, useState, useCallback, useEffect, MutableRefObject, FunctionComponent } from "react";
import { IQuizData, QuizContext } from "../../pages/Quiz";
import { randomInt, shuffle } from "../../misc/misc";
import BREEDS from "../../data/Breeds";
import API_KEYS from "../../configs/APIKeys";
import OptionButton from "../OptionButton/OptionButton";
import styles from "./QuizCard.module.css";

interface IQuestionData {
    answer: string;
    options: string[];
}

const QuizCard: FunctionComponent<IQuizCard> = ({ target, text }) => {
    const { quizState, setQuizState } = useContext(QuizContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
    const question = useRef({} as IQuestionData);

    question.current = {
        answer: "",
        options: [],
    } as IQuestionData;

    //Refactor it into separate hook
    //EVEEEEERYTHING BELLOW
    let randomIndex = randomInt(BREEDS.length - 1);
    while (!BREEDS[randomIndex][target]) randomIndex = randomInt(BREEDS.length - 1);
    question.current.answer = BREEDS[randomIndex][target] as string;

    //Add invalid options
    for (let i = 0; i < question.current.answer.length + 1; i++) {
        let randomOption = BREEDS[randomInt(BREEDS.length - 1)][target] as string;
        while (randomOption === "" || randomOption === " " || question.current.options.includes(randomOption)) {
            randomOption = BREEDS[randomInt(BREEDS.length - 1)][target] as string;
        }
        question.current.options.push(randomOption);
    }
    question.current.options.concat(question.current.answer);

    //Random order
    shuffle(question.current.options);
    //UP TO HERE

    const userPick = useCallback(
        (choice: string) => {
            setQuizState((prev: IQuizData) => {
                const updated = { ...prev };
                const isCorrect: boolean = question.current.answer === choice;

                updated.score += isCorrect ? 1 : 0;
                updated.choices[choice] = question.current.answer.toString();
                updated.pagesPassed++;

                return updated;
            });
        },
        [quizState]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                let response = await fetch(
                    "https://api.thecatapi.com/v1/images/search?" +
                        new URLSearchParams({
                            breed: BREEDS[randomIndex].name,
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
    }, []);

    if (isError) {
        return <h1>Error occured</h1>;
    }
    return (
        <div>
            <div>
                <p>Completed {quizState.pagesPassed}/5</p>
                {isLoading && <p>Loading...</p>}
                <img
                    key={quizState.pagesPassed}
                    className={isLoading ? styles.imageLoading : styles.image}
                    ref={imgRef}
                />
            </div>
            <p>{text}</p>
            <div>
                {question.current.options.map((option) => (
                    <OptionButton key={option + quizState.pagesPassed} text={option} userPick={userPick} />
                ))}
            </div>
        </div>
    );
};
export default QuizCard;
