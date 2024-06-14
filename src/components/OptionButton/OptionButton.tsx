import { FunctionComponent } from "react";

interface IOptionButton {
    text: string;
    userPick: (value: string) => void;
}
const OptionButton: FunctionComponent<IOptionButton> = ({ text, userPick }) => {
    return <button onClick={() => userPick(text)}>{text}</button>;
};

export default OptionButton;
