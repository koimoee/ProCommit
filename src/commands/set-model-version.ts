import * as vscode from "vscode";
import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setModelVersion() {
  logToOutputChannel("Starting setModelVersion command");
  const modelVersion = await vscode.window.showInputBox({
    title: "Enter the model version for AI commit messages",
    value: "gpt-3.5-turbo-16k",
  });

  if (!modelVersion) {
    logToOutputChannel("User canceled setModelVersion command");
    return;
  }

  logToOutputChannel("Saving model version configuration");
  await setConfigurationValue("openAI.modelVersion", modelVersion);

  return modelVersion;
}
