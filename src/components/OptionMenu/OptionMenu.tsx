import { createContext, FunctionComponent, ReactElement, useCallback, useContext, useState } from "react";
import { IQuizContext, IQuizData, QuizContext } from "../../pages/Quiz";
import OptionButton from "../OptionButton/OptionButton";
import styles from "./OptionMenu.module.css";
interface IOptionMenuContext {
    selected: string;
    changeSelected: (value: string) => void;
}

const OptionMenuContext = createContext({} as IOptionMenuContext);
export const OptionMenu: FunctionComponent<{ children: ReactElement[] }> = ({ children }) => {
    const [selected, setSelected] = useState("");
    const changeSelected = useCallback((value: string) => {
        setSelected((current) => (value === current ? "" : value));
    }, []);
    return (
        <OptionMenuContext.Provider value={{ selected: selected, changeSelected: changeSelected }}>
            {children}
        </OptionMenuContext.Provider>
    );
};

export const Option: FunctionComponent<{ value: string }> = ({ value }) => {
    const { selected, changeSelected } = useContext(OptionMenuContext);
    return (
        <button
            onClick={() => changeSelected(value)}
            className={value === selected ? styles.optionSelected : styles.option}
        >
            {value}
        </button>
    );
};

export const SubmitOption: FunctionComponent<{ answer: string }> = ({ answer }) => {
    const { selected, changeSelected } = useContext(OptionMenuContext);
    const { setQuizState } = useContext(QuizContext);

    const submit = useCallback((selected: string, answer: string) => {
        setQuizState((previous) => {
            const updated = { ...previous };
            updated.pagesPassed++;
            updated.score += answer === selected ? 1 : 0;
            updated.choices[selected] = answer;
            return updated;
        });
        changeSelected(selected);
    }, []);

    const isSelectedEmpty = selected.replace(" ", "") === "";
    return (
        <>
            <button onClick={isSelectedEmpty ? () => {} : () => submit(selected, answer)}> Submit </button>
            {isSelectedEmpty && <p>You must pick a value before submiting</p>}
        </>
    );
};
