import { useAppSelector } from "../redux/hooks";

type ErrorMessageProps = {
  className?: "error-message" | "not-found";
  text: string;
};

const ErrorMessage = ({ className, text }: ErrorMessageProps) => {
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return <p className={`${className} ${theme}`}>{text}</p>;
};

export default ErrorMessage;
