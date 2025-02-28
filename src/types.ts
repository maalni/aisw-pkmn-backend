import { Send } from "express-serve-static-core";

export type ResponseState = "ERROR" | "SUCCESS";
export type Stage = "DETECTING" | "EMBEDDING";

export interface TypedRequest<ReqBody> extends Express.Request {
  body: ReqBody;
}

export interface TypedResponse<ResBody> extends Express.Response {
  status(code: number): this;
  json: Send<ResBody, this>;
}

export type RequestBody = {
  data: string;
  set: string;
  number: string;
  stage: Stage;
};

type BaseResponseBody = {
  STATE: ResponseState;
};

export type ResponseBody = ErrorResponseBody | SuccessResponseBody;

export interface ErrorResponseBody extends BaseResponseBody {
  STATE: "ERROR";
  message: string;
}

export interface SuccessResponseBody extends BaseResponseBody {
  STATE: "SUCCESS";
  STAGE: Stage;
  result?: object;
}
