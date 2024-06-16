import { FunctionComponent, useContext } from "react";
import { OptionMenuContext } from "../OptionMenu/OptionMenu";
import styles from "./OptionButton.module.css";

const OptionButton: FunctionComponent<{ value: string }> = ({ value }) => {
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

export default OptionButton;
