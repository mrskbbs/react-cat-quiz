import { createContext, FunctionComponent, ReactElement, useState, useCallback } from "react";
import styles from "./OptionMenu.module.css";
interface IOptionMenuContext {
    selected: string;
    changeSelected: (value: string) => void;
}

export const OptionMenuContext = createContext({} as IOptionMenuContext);

export const OptionMenu: FunctionComponent<{ children: ReactElement[]; submitBtn: ReactElement }> = ({
    children,
    submitBtn,
}) => {
    const [selected, setSelected] = useState("");
    const changeSelected = useCallback((value: string) => {
        setSelected((current) => (value === current ? "" : value));
    }, []);
    return (
        <OptionMenuContext.Provider value={{ selected: selected, changeSelected: changeSelected }}>
            <div className={styles.menuContainer}>
                <div className={styles.optionsContainer}>{children}</div>
                {submitBtn}
            </div>
        </OptionMenuContext.Provider>
    );
};
