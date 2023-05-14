import { ErrorType } from "./fetch-functions";

export function axiosErrorHandler(res: ErrorType | undefined) {
  if (res) return res.errorMessage;
  else return "Something went wrong.";
}
