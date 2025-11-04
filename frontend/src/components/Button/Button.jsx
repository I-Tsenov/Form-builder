import styles from "./Button.module.scss";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
}) => {
  const isUnresponsive = loading || disabled;
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        isUnresponsive ? styles.disabled : ""
      }`}
      disabled={isUnresponsive}
      onClick={onClick}
    >
      {!loading ? children : "Loading..."}
    </button>
  );
};

export default Button;
