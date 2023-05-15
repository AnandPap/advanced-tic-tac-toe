import { Error } from "./fetch-functions";

export function errorHandler(res: Error | undefined) {
  if (res) return res.errorMessage;
  else return "Something went wrong.";
}
