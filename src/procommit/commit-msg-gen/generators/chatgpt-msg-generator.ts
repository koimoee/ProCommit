import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

import { trimNewLines } from "@utils/text";
import { Configuration as AppConfiguration } from "@utils/configuration";
import { getSystemInstruction } from "@utils/customInstruction";

import { MsgGenerator } from "./msg-generator";

function generateCommitMessageChatCompletionPrompt(
  diff: string
): Array<ChatCompletionRequestMessage> {
  const initMessagesPrompt: Array<ChatCompletionRequestMessage> = [
    getSystemInstruction(),
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: diff,
    },/*
    getAssistantInstruction(),
    */
  ];

  return initMessagesPrompt;
}

const defaultModel = "gpt-3.5-turbo-16k";
const defaultTemperature = 0.2;
const defaultMaxTokens = 196;

export class ChatgptMsgGenerator implements MsgGenerator {
  openAI: OpenAIApi;
  config?: AppConfiguration["openAI"];

  constructor(config: AppConfiguration["openAI"]) {
    this.openAI = new OpenAIApi(
      new Configuration({
        apiKey: config.apiKey,
      }),
      config.customEndpoint?.trim() || undefined
    );
    this.config = config;
  }

  async generate(diff: string): Promise<string> {
    const messages = generateCommitMessageChatCompletionPrompt(diff);
    const { data } = await this.openAI.createChatCompletion({
      model: this.config?.modelVersion || defaultModel,
      messages: messages,
      n: 4,
      temperature: this.config?.temperature || defaultTemperature,
      max_tokens: this.config?.maxTokens || defaultMaxTokens,
    });

    if (!data || !data.choices || data.choices.length === 0) {
      throw new Error("No commit messages were generated. Try again.");
    }

    // Collect all generated messages
    const commitMessages = data.choices.map((choice) => {
      const message = choice.message?.content;
      return trimNewLines(message || "");
    });

    return commitMessages[0];
  }
}
