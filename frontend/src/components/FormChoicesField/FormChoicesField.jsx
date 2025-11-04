import { useState } from "react";
import Button from "../Button";
import styles from "./FormChoicesField.module.scss";
import FormInput from "../FormInput";

const FormChoicesField = ({
  onChangeHandler,
  value: choices,
  choiceError,
  setChoiceError,
  MAX_CHOICES,
  ...props
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    const currInput = input.trim();

    if (e.key === "Enter" && currInput !== "") {
      e.preventDefault();

      if (choices.includes(currInput)) {
        setChoiceError("This choice already exists.");
        return;
      }

      if (choices.length >= MAX_CHOICES) {
        setChoiceError(
          "You can't add more than 50 choices, default value is included."
        );
        return;
      }

      const updatedChoices = [...choices, currInput];
      onChangeHandler(updatedChoices);
      setInput("");
      setChoiceError("");
    }
  };

  const removeChoice = (e, index) => {
    e.preventDefault();
    const updatedChoices = choices.filter((_, i) => i !== index);
    onChangeHandler(updatedChoices);

    if (choiceError && updatedChoices.length < MAX_CHOICES) {
      setChoiceError("");
    }
  };

  return (
    <div className={styles.choicesWrapper}>
      <FormInput
        {...props}
        value={input}
        pattern=".{0,40}"
        title="Maximum 40 characters allowed"
        onChangeHandler={(e) => setInput(e.target.value)}
        onKeyDownHandler={(e) => handleKeyDown(e)}
      />
      {choices.length > 0 && (
        <ul className={styles.list}>
          {choices.map((choice, i) => (
            <li key={choice.toLowerCase()} className={styles.listItem}>
              <span className={styles.itemText}>{choice}</span>
              <Button
                size="small"
                variant="ghost"
                onClick={(e) => removeChoice(e, i)}
              >
                x
              </Button>
            </li>
          ))}
        </ul>
      )}
      {choiceError && <div className={styles.errorMessage}>{choiceError}</div>}
    </div>
  );
};

export default FormChoicesField;
