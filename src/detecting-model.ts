import { ObjectDetectionPipeline, pipeline } from "@huggingface/transformers";

export class DetectingModel {
  static instance: ObjectDetectionPipeline | null = null;

  static async getInstance(
    progress_callback = null,
  ): Promise<ObjectDetectionPipeline> {
    if (this.instance === null) {
      this.instance = await pipeline("object-detection", "maalni/yolo-pkmn", {
        progress_callback,
      });
    }

    return this.instance;
  }
}
