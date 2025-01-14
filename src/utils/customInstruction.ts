import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { getLanguage, getShowEmoji } from "./configuration";
import { englishInstructions, russianInstructions, japanInstructions, englishAssistantInstruction, japanAssistantInstruction, russianAssistantInstruction, koreanInstructions, germanInstructions, koreanAssistantInstruction, germanAssistantInstruction, emojiInstructions } from "./langInstruction";

export function getSystemInstruction(): {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
} {
  const language = getLanguage();
  const showEmoji = getShowEmoji();

  const instructionsByLanguage: Record<string, string> = {
    English: englishInstructions,
    Japanese: japanInstructions,
    Russian: russianInstructions,
    Korean: koreanInstructions,
    German: germanInstructions,
  };

  let content = instructionsByLanguage[language] || englishInstructions;
  if (showEmoji) {
    content += emojiInstructions;
  }

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
  const showEmoji = getShowEmoji();

  const instructionsAssistantByLanguage: Record<string, string> = {
    English: englishAssistantInstruction,
    Japanese: japanAssistantInstruction,
    Russian: russianAssistantInstruction,
    Korean: koreanAssistantInstruction,
    German: germanAssistantInstruction,
  };

  let content = instructionsAssistantByLanguage[language] || englishAssistantInstruction;
  if (showEmoji) {
    content += emojiInstructions;
  }

  return {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content,
  };
}
