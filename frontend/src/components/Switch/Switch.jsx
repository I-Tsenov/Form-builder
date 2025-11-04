import styles from "./Switch.module.scss";

function Switch({ onChangeHandler, value = false }) {
  const toggleSwitch = (e) => {
    e.preventDefault();
    onChangeHandler(!value);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.switch} ${value ? styles.on : styles.off}`}
        onClick={(e) => toggleSwitch(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleSwitch(e);
          }
        }}
        role="switch"
        aria-checked={value}
        tabIndex={0}
      >
        <span className={(styles.label, styles.on_label)}>ON</span>
        <span className={(styles.label, styles.off_label)}>OFF</span>
        <div className={styles.slider} />
      </button>
    </div>
  );
}

export default Switch;
