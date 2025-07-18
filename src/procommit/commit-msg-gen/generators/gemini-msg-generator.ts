

import { MsgGenerator } from "./msg-generator";
import { GoogleGenAI } from "@google/genai";
import { getConfiguration } from "@utils/configuration";
import {
  englishInstructions,
  russianInstructions,
  japanInstructions,
  koreanInstructions,
  germanInstructions
} from "@utils/langInstruction";

export class GeminiMsgGenerator implements MsgGenerator {
  apiKey: string;
  model: string;
  endpoint: string;

  constructor({ apiKey, endpoint, model }: { apiKey?: string; endpoint?: string; model?: string }) {
    this.apiKey = apiKey || "";
    this.model = model || "gemini-2.5-flash";
    this.endpoint = endpoint || "https://generativelanguage.googleapis.com/v1beta/models";
  }

  async generate(diff: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: this.apiKey });
    const config = getConfiguration();
    const language = config.general?.language || "English";
    let instruction: string;
    switch (language) {
      case "Russian":
        instruction = russianInstructions;
        break;
      case "Japanese":
        instruction = japanInstructions;
        break;
      case "Korean":
        instruction = koreanInstructions;
        break;
      case "German":
        instruction = germanInstructions;
        break;
      case "English":
      default:
        instruction = englishInstructions;
        break;
    }
    const prompt = `${instruction}\n\n${diff}`;
    const response = await ai.models.generateContent({
      model: this.model,
      contents: prompt,
    });
    if (!response || typeof response.text !== "string" || !response.text.trim()) {
      throw new Error("No valid commit message found in Gemini response.");
    }
    return response.text.trim();
  }
}
