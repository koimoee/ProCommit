import { z } from "zod";
import * as vscode from "vscode";

import { DeepKey } from "./types";

const configurationSchema = z.object({
  general: z.object({
    generator: z
      .enum(["ChatGPT", "Custom"])
      .default("ChatGPT")
      .catch("ChatGPT")
      .optional(),
    messageApproveMethod: z
      .enum(["Quick pick", "Message file"])
      .default("Quick pick")
      .catch("Quick pick")
      .optional(),
    language: z
      .enum(["English", "Japanese", "Russian", "Korean", "German"])
      .default("English")
      .catch("English")
      .optional(),
    useMultipleResults: z.boolean().default(false).catch(false).optional(),
    showEmoji: z.boolean().default(false).catch(false).optional(),
  }),
  openAI: z.object({
    apiKey: z.string().optional(),
    modelVersion: z.string().optional(),
    customEndpoint: z
      .string()
      .default("https://api.openai.com/v1")
      .catch("https://api.openai.com/v1")
      .optional(),
    temperature: z.number().optional(),
    maxTokens: z.number().optional(),
  }),
});

export type Configuration = z.infer<typeof configurationSchema>;

export async function setConfigurationValue(
  key: DeepKey<Configuration>,
  value: any
) {
  const configuration = vscode.workspace.getConfiguration("procommit");
  await configuration.update(key, value, vscode.ConfigurationTarget.Global);
}

export function getLanguage(): string {
  const configuration = vscode.workspace.getConfiguration("procommit");
  const parsed = configurationSchema.parse(configuration);
  return parsed.general.language ?? "English";
}

export function getConfiguration() {
  const configuration = vscode.workspace.getConfiguration("procommit");
  return configurationSchema.parse(configuration);
}

export function getShowEmoji(): boolean {
  const configuration = vscode.workspace.getConfiguration("procommit");
  const parsed = configurationSchema.parse(configuration);
  return parsed.general.showEmoji ?? false;
}
