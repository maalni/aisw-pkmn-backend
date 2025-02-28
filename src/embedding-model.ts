import {
  ImageFeatureExtractionPipeline,
  pipeline,
} from "@huggingface/transformers";

export class EmbeddingModel {
  static instance: ImageFeatureExtractionPipeline | null = null;

  static async getInstance(
    progress_callback = null,
  ): Promise<ImageFeatureExtractionPipeline> {
    if (this.instance === null) {
      this.instance = await pipeline(
        "image-feature-extraction",
        "Xenova/clip-vit-base-patch32",
        {
          progress_callback,
        },
      );
    }

    return this.instance;
  }
}
