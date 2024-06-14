import OptionButton from "../OptionButton/OptionButton";
import styles from "./QuizCard.module.css";

const QuizCard = () => {
    const imgLink = "https://cdn2.thecatapi.com/images/unPP08xOZ.jpg";
    return (
        <div>
            <p>1/5</p>
            <img className={styles.image} src={imgLink} />
            <p>What breed is this cat?</p>
            <div>
                <OptionButton text="Tabby" />
                <OptionButton text="Tabby" />
                <OptionButton text="Tabby" />
            </div>
        </div>
    );
};

export default QuizCard;
