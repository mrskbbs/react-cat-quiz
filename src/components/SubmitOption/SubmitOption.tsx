import { FunctionComponent, useContext, useCallback } from "react";
import { QuizContext } from "../QuizCardContainer/QuizCardContainer";
import { OptionMenuContext } from "../OptionMenu/OptionMenu";
import styles from "./SubmitOption.module.css";

const SubmitOption: FunctionComponent<{ answer: string }> = ({ answer }) => {
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
            <button className="buttonUi" onClick={isSelectedEmpty ? () => {} : () => submit(selected, answer)}>
                {" "}
                Submit{" "}
            </button>
            <p className={`${styles.error} ${isSelectedEmpty ? styles.errorVisible : styles.errorInvisible}`}>
                You must pick a value before submiting
            </p>
        </>
    );
};

export default SubmitOption;
