type ValidationMessageProps = {
  className?: string;
  text: string;
};

const ErrorMessage = ({ className, text }: ValidationMessageProps) => {
  return <p className={`${className} error-message`}>{text}</p>;
};

export default ErrorMessage;
