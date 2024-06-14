import { createContext, lazy, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import OptionButton from "../OptionButton/OptionButton";
import styles from "./QuizCard.module.css";
import API_KEYS from "../../configs/APIKeys";
import BREEDS from "../../data/Breeds";
import { randomInt, shuffle } from "../../misc/misc";
import { Navigate } from "react-router-dom";
import APP_PATHS from "../../configs/RouterPaths";

export interface QuestionData {
    url: string;
    answers: string[];
    choice: string;
    options: string[];
}

export const QuizCard = () => {
    const questions = useRef([] as QuestionData[]);
    const [questionsPassed, setQuestionsPassed] = useState(0);
    const score = useRef(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    questions.current = [
        {
            url: "https://cdn2.thecatapi.com/images/pzIURJPra.jpg",
            answers: ["Munchkin"],
            options: ["Munchkin", "British Shorthair", "Pixie-bob"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/BtoHr0-4b.jpg",
            answers: ["Norwegian Forest Cat"],
            options: ["Khao Manee", "Norwegian Forest Cat", "Maine Coon"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/AnSMHMGvb.jpg",
            answers: ["Norwegian Forest Cat"],
            options: ["Norwegian Forest Cat", "Cymric", "Burmilla"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/VsxceZVop.jpg",
            answers: ["Toyger"],
            options: ["Toyger", "Cyprus", "Pixie-bob"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/2CL5AqIfV.png",
            answers: ["Toyger"],
            options: ["Toyger", "Korat", "Cymric"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/XLLAS_R9F.jpg",
            answers: ["Birman"],
            options: ["Kurilian", "Bombay", "Birman"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/LxcLIxuVT.jpg",
            answers: ["Munchkin"],
            options: ["Toyger", "Munchkin", "Exotic Shorthair"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/eF3HSMIB_.jpg",
            answers: ["Ragdoll"],
            options: ["Ocicat", "Oriental", "Ragdoll"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/VGzO6r82_.jpg",
            answers: ["Singapura"],
            options: ["Chausie", "Arabian Mau", "Singapura"],
            choice: "",
        },
        {
            url: "https://cdn2.thecatapi.com/images/5EDC-TDcN.jpg",
            answers: ["Ocicat"],
            options: ["Ocicat", "Selkirk Rex", "Japanese Bobtail"],
            choice: "",
        },
    ];

    const userPick = useCallback(
        (value: string) => {
            if (questions.current[questionsPassed].answers.includes(value)) score.current++;
            questions.current[questionsPassed].choice = value.slice();
            setQuestionsPassed((prev) => prev + 1);
        },
        [questionsPassed]
    );

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true);
    //             let response = await fetch(
    //                 "https://api.thecatapi.com/v1/images/search?" +
    //                     new URLSearchParams({
    //                         limit: "5",
    //                         has_breeds: "1",
    //                         // api_key: API_KEYS.catAPI,
    //                     })
    //             );
    //             const data = await response.json();
    //             for (let el of data) {
    //                 questions.current.push({
    //                     url: el.url,
    //                     answers: [],
    //                     options: [],
    //                     choice: "",
    //                 } as QuestionData);
    //                 const last = questions.current.length - 1;

    //                 // Add answers
    //                 for (let breed of el.breeds) {
    //                     questions.current[last].answers.push(breed.name);
    //                     questions.current[last].options.push(breed.name);
    //                 }

    //                 //Add invalid options
    //                 for (let i = 0; i < questions.current[last].answers.length + 1; i++) {
    //                     let randomBreed = BREEDS[randomInt(BREEDS.length - 1)];
    //                     while (questions.current[last].options.includes(randomBreed)) {
    //                         randomBreed = BREEDS[randomInt(BREEDS.length - 1)];
    //                     }
    //                     questions.current[last].options.push(randomBreed);
    //                 }
    //                 shuffle(questions.current[last].options);
    //             }
    //             setIsLoading(false);
    //             console.log(questions.current);
    //         } catch (e) {
    //             setIsError(true);
    //         }
    //     };
    //     fetchData();
    // }, []);

    if (isError) {
        return <div>Error occured</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (questionsPassed >= questions.current.length) {
        return (
            <Navigate
                to={APP_PATHS.quiz + "/results"}
                state={{
                    score: score.current,
                    questions: questions.current,
                }}
            />
        );
    }

    return (
        <div>
            <p>
                Completed {questionsPassed}/{questions.current.length}
            </p>
            <img className={styles.image} src={questions.current[questionsPassed].url} />
            <p>What breed is this cat?</p>

            <div>
                {questions.current[questionsPassed].options.map((option) => (
                    <OptionButton key={option} text={option} userPick={userPick} />
                ))}
            </div>
        </div>
    );
};
