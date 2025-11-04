import { useState } from "react";
import Button from "../Button";
import styles from "./FormChoicesField.module.scss";
import FormInput from "../FormInput";

const FormChoicesField = ({ onChangeHandler, value: choices, ...props }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    let currInput = input.trim();
    if (e.key === "Enter" && currInput !== "") {
      e.preventDefault();
      if (choices.includes(currInput) || choices.length >= 50) return;
      const updatedChoices = [...choices, currInput];
      onChangeHandler(updatedChoices);
      setInput("");
    }
  };

  const removeChoice = (e, index) => {
    e.preventDefault();
    const updatedChoices = choices.filter((_, i) => i !== index);
    onChangeHandler(updatedChoices);
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
    </div>
  );
};

export default FormChoicesField;
