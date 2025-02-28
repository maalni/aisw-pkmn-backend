import {
  ErrorResponseBody,
  Stage,
  SuccessResponseBody,
  TypedResponse,
} from "./types";

export const sendErrorResponse = (
  res: TypedResponse<ErrorResponseBody>,
  message: string,
) => {
  res.status(500).json({ STATE: "ERROR", message });
};

export const sendSuccessResponse = (
  res: TypedResponse<SuccessResponseBody>,
  stage: Stage,
  data?: object,
) => {
  res.status(200).json({ STATE: "SUCCESS", STAGE: stage, ...data });
};
