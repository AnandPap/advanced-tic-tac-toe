import axios from "axios";

export type ErrorObject = {
  code: number | undefined;
  errorMessage: string;
};

export function errorHandler(res: ErrorObject | undefined) {
  if (res) return res.errorMessage;
  else return "Something went wrong.";
}

export function getAxiosErrorObject(err: unknown) {
  if (axios.isAxiosError(err)) {
    const errorObject: ErrorObject = {
      code: err.response?.status,
      errorMessage: err.response?.data || err.response?.statusText,
    };
    return errorObject;
  } else return undefined;
}
