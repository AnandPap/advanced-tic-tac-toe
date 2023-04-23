import { useAppSelector } from "./redux/hooks";

type ValidationMessageProps = {
  className?: string;
  text: string;
};

const ErrorMessage = ({ className, text }: ValidationMessageProps) => {
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return <p className={`${className} ${theme}`}>{text}</p>;
};

export default ErrorMessage;
