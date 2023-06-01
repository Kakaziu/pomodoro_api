import { User } from "../models/User";

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T | ResponseBodyError;
}

export interface ResponseBodyError {
  message: string;
}

export interface IController<P, T> {
  handle(
    httpRequest: HttpRequest<P>
  ): Promise<HttpResponse<T | ResponseBodyError>>;
}

export type OmitId<I> = Omit<I, "id">;
