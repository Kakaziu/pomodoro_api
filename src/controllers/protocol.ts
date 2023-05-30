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

export type OmitIdUser = Omit<User, "id">;
