import { forwardRef } from "react";

interface ErrorMessageProps {
  className?: "error-message" | "not-found" | string;
  text: string;
}

const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  function ErrorMessage({ className, text }, ref) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }
);

export default ErrorMessage;
