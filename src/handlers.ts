import { saveEmbedding, queryEmbedding } from "./pinecone.js";
import { getEmbeddings } from "./embedding";
import { sendErrorResponse, sendSuccessResponse } from "./response";
import {
  RequestBody,
  ResponseBody,
  TypedRequest,
  TypedResponse,
} from "./types";
import { getCardNameById } from "./pkmn-api";

export const handleImage = async (
  req: TypedRequest<RequestBody>,
  res: TypedResponse<ResponseBody>,
) => {
  const data = req.body;

  const { data: imageData, set, number, stage } = data;
  const id = `${set}-${number}`;
  console.log(`Received ${stage} request: `);

  if (stage === "EMBEDDING" && (set === "" || number === "")) {
    return sendErrorResponse(res, "NO_LABEL");
  }

  try {
    const embeddings = await getEmbeddings(imageData);
    console.log("Got embedding");

    if (embeddings.length === 0) {
      return sendErrorResponse(res, "NO_EMBEDDING");
    }

    switch (stage) {
      case "EMBEDDING":
        const cardName = await getCardNameById(id);

        await saveEmbedding({
          id,
          values: embeddings,
          metadata: { set: set, number: number, name: cardName },
        });

        console.log("Embedding saved");

        return sendSuccessResponse(res, stage);
      case "DETECTING":
        const result = await queryEmbedding({
          values: embeddings,
        });

        console.log("Query returned " + result.length + " results");

        return sendSuccessResponse(res, stage, { result: result });
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      sendErrorResponse(res, e.message);
    }
  }
};
