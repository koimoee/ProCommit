
import * as vscode from "vscode";
import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setCustomEndpoint() {
  logToOutputChannel("Starting setCustomEndpoint command");
  const endpoint = await vscode.window.showInputBox({
    title: "Enter the custom endpoint URL",
    value: "https://api.openai.com/v1",
  });

  if (!endpoint) {
    logToOutputChannel("User canceled setCustomEndpoint command");
    return;
  }

  logToOutputChannel("Saving endpoint configuration");
  await setConfigurationValue("endpoint", endpoint);

  return endpoint;
}