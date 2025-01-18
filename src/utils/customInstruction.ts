import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { getLanguage, getShowEmoji } from "./configuration";
import { englishInstructions, russianInstructions, japanInstructions, englishAssistantInstruction, koreanInstructions, germanInstructions, emojiInstructions } from "./langInstruction";

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

  let content = instructionsByLanguage[language] || englishInstructions;

  return {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content,
  };
}

export function getAssistantInstruction(): {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
} {
  const showEmoji = getShowEmoji();

  let content = englishAssistantInstruction;
  if (showEmoji) {
    content += emojiInstructions;
  } else {
    content += "";
  }

  return {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content,
  };
}
