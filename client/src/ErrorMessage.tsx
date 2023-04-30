import { useAppSelector } from "./redux/hooks";

type ErrorMessageProps = {
  className?: string;
  text: string;
};

const ErrorMessage = ({ className, text }: ErrorMessageProps) => {
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return (
    <div className={`${className}-wrapper ${theme}`}>
      <h2 className={`${className}`}>{text}</h2>
    </div>
  );
};

export default ErrorMessage;
