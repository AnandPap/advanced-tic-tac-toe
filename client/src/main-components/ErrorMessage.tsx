type ErrorMessageProps = {
  className?: "error-message" | "not-found";
  text: string;
};

const ErrorMessage = ({ className, text }: ErrorMessageProps) => {
  return <p className={className}>{text}</p>;
};

export default ErrorMessage;
