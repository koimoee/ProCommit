import { z } from "zod";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import * as vscode from "vscode";
import { getLanguage } from "./configuration";
import { englishInstructions, russianInstructions, japanInstructions } from "./langInstruction";

const configurationSchema = z.object({
  general: z.object({
    instruction: z.string().optional(),
  }),
});

export function getSystemInstruction(): {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
} {
  const language = getLanguage();

  const instructionsByLanguage: Record<string, string> = {
    English: englishInstructions,
    Japanese: japanInstructions,
    Russian: russianInstructions,
  };

  const content = instructionsByLanguage[language] || englishInstructions;

  return {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content,
  };
}

function getInstructionType(): string {
  const configuration = vscode.workspace.getConfiguration("procommit");
  const parsed = configurationSchema.parse(configuration);
  return parsed.general.instruction ?? "Short";
}
