import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

import { trimNewLines } from "@utils/text";
import { Configuration as AppConfiguration, getConfiguration } from "@utils/configuration";
import { getAssistantInstruction, getSystemInstruction } from "@utils/customInstruction";
import { MsgGenerator } from "./msg-generator";

async function generateCommitMessageChatCompletionPrompt(
  diff: string
): Promise<Array<ChatCompletionRequestMessage>> {
  const initMessagesPrompt: Array<ChatCompletionRequestMessage> = [
    await getSystemInstruction(),
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: diff,
    },
    await getAssistantInstruction(),
  ];

  return initMessagesPrompt;
}

const defaultModel = "gpt-4o-mini";
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
    const configuration = getConfiguration();
    let n;
    if (configuration.general.useMultipleResults){
      n = 4;
    } else {
      n = 1;
    }
    const messages = await generateCommitMessageChatCompletionPrompt(diff);
    const { data } = await this.openAI.createChatCompletion({
      model: this.config?.modelVersion || defaultModel,
      messages: messages,
      n,
      temperature: this.config?.temperature || defaultTemperature,
      max_tokens: this.config?.maxTokens || defaultMaxTokens,
    });

    if (!data || !data.choices || data.choices.length === 0) {
      throw new Error("No commit messages were generated. Try again.");
    }

    // Collect all generated messages
    const commitMessages = data.choices.map((choice) => {
      let message = choice.message?.content || "";
      // Remove leading '*' and any whitespace after it
      message = trimNewLines(message).replace(/^\*\s*/, "");
      // Extract scope and keep only the filename with extension (no slashes or folders)
      message = message.replace(/\(([^)]+)\)/, (match, scope) => {
        // Remove any leading/trailing slashes and whitespace
        let cleanScope = scope.trim().split("/").pop() || scope.trim();
        return `(${cleanScope})`;
      });
      return message;
    });

    return commitMessages[0];
  }
}
