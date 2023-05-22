import { useAppSelector } from "../redux/hooks";

type ErrorMessageProps = {
  className?: string;
  text: string;
};

const ErrorMessage = ({ className, text }: ErrorMessageProps) => {
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return <p className={`${className} ${theme}`}>{text}</p>;
};

export default ErrorMessage;
