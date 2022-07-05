import classnames from "classnames";
import styles from "./button.module.scss";

interface IButton {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  completed?: boolean;
  onClick?: any;
}

function Button({ children, type, completed, onClick }: IButton) {
  return (
    <button type={type} className={classnames(styles.btn, completed && styles.completed)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
