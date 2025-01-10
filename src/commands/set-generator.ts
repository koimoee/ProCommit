import * as vscode from "vscode";
import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setGenerator() {
  logToOutputChannel("Starting setGenerator command");
  const generator = await vscode.window.showQuickPick(["ChatGPT", "Custom"], {
    title: "Select the generator for commit messages",
  });

  if (!generator) {
    logToOutputChannel("User canceled setGenerator command");
    return;
  }

  logToOutputChannel("Saving generator configuration");
  await setConfigurationValue("general.generator", generator);

  return generator;
}
