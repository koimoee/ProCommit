import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { getLanguage } from "./configuration";
import { englishInstructions, russianInstructions, japanInstructions, englishAssistantInstruction, japanAssistantInstruction, russianAssistantInstruction, koreanInstructions, germanInstructions, koreanAssistantInstruction, germanAssistantInstruction } from "./langInstruction";

export function getSystemInstruction(): {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
} {
  const language = getLanguage();

  const instructionsByLanguage: Record<string, string> = {
    English: englishInstructions,
    Japanese: japanInstructions,
    Russian: russianInstructions,
    Korean: koreanInstructions,
    German: germanInstructions,
  };

  const content = instructionsByLanguage[language] || englishInstructions;

  return {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content,
  };
}

export function getAssistantInstruction(): {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
} {
  const language = getLanguage();

  const instructionsAssistantByLanguage: Record<string, string> = {
    English: englishAssistantInstruction,
    Japanese: japanAssistantInstruction,
    Russian: russianAssistantInstruction,
    Korean: koreanAssistantInstruction,
    German: germanAssistantInstruction,
  };

  const content = instructionsAssistantByLanguage[language] || englishAssistantInstruction;

  return {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content,
  };
}
