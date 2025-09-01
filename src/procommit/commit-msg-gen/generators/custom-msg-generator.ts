
import fetch from "node-fetch";
import { MsgGenerator } from "./msg-generator";
import { getConfiguration } from "@utils/configuration";
import {
  englishInstructions,
  russianInstructions,
  japanInstructions,
  koreanInstructions,
  germanInstructions
} from "@utils/langInstruction";

export class CustomMsgGenerator implements MsgGenerator {
  endpoint: string;
  constructor({ endpoint }: { endpoint?: string }) {
    this.endpoint = endpoint || "";
  }
  async generate(diff: string): Promise<string> {
    if (!this.endpoint) throw new Error("Custom endpoint is required.");
    const url = this.endpoint;
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
    const body = { diff: prompt };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`Custom generator API error: ${response.statusText}`);
    const data: any = await response.json();
    // Try to extract a commit message from common fields
    if (typeof data === "string") return data.trim();
    if (data.commitMessage) return data.commitMessage.trim();
    if (data.message) return data.message.trim();
    if (data.output) return data.output.trim();
    throw new Error("No commit message returned by custom endpoint.");
  }
}
