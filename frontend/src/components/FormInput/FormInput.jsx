import styles from "./FormInput.module.scss";

const FormInput = ({
  onChangeHandler = () => {},
  onKeyDownHandler = () => {},
  ...props
}) => {
  return (
    <div className={styles.formInput}>
      <input
        {...props}
        onChange={(e) => onChangeHandler(e)}
        onKeyDown={onKeyDownHandler}
        autoComplete="off"      />
    </div>
  );
};

export default FormInput;
