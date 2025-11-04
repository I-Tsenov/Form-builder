import styles from "./SelectField.module.scss";

const SelectField = ({ options, onChangeHandler = () => {} }) => {
  return (
    <select
      id="mode"
      className={styles.selectElement}
      onChange={(e) => onChangeHandler(e)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option?.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
