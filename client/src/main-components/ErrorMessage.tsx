import { useAppSelector } from "../redux/hooks";

type ErrorMessageProps = {
  className?: string;
  text: string;
};

const ErrorMessage = ({ className, text }: ErrorMessageProps) => {
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return <h2 className={`${className} ${theme}`}>{text}</h2>;
};

export default ErrorMessage;
