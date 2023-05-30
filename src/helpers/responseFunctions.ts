import { HttpResponse, ResponseBodyError } from "../controllers/protocol";

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};

export const badRequest = (
  message: string
): HttpResponse<ResponseBodyError> => {
  return {
    statusCode: 400,
    body: { message },
  };
};

export const serverError = (): HttpResponse<ResponseBodyError> => {
  return {
    statusCode: 500,
    body: { message: "Something went wrong" },
  };
};
