import { RawImage } from "@huggingface/transformers";
import { EmbeddingModel } from "./embedding-model";
import { DetectingModel } from "./detecting-model";

export const getEmbeddings = async (imageBase64: string) => {
  const base64Response = await fetch(`data:image/jpeg;base64,${imageBase64}`);
  const blob = await base64Response.blob();
  const image = await RawImage.fromBlob(blob);

  try {
    const card_detector = await DetectingModel.getInstance();

    const cardsInFrame = await card_detector(image, { threshold: 0.9 });

    if (cardsInFrame === undefined) {
      return [];
    }
  } catch (e) {
    console.log("Failed to get detect card", e);
  }

  try {
    const image_feature_extractor = await EmbeddingModel.getInstance();

    const output = await image_feature_extractor(image);

    return output.tolist();
  } catch (e) {
    console.log("Failed to get embeddings", e);
  }
};
