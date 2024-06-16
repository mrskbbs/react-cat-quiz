import { createContext, FunctionComponent, ReactElement, useState, useCallback } from "react";

interface IOptionMenuContext {
    selected: string;
    changeSelected: (value: string) => void;
}

export const OptionMenuContext = createContext({} as IOptionMenuContext);

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
