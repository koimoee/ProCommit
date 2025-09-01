import * as vscode from "vscode";

import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setOpenaiApiKey() {
  logToOutputChannel("Starting setOpenaiApiKey command");
  const apiKey = await vscode.window.showInputBox({
    title: "Please enter your OpenAi API Key",
  });

  if (!apiKey || apiKey.trim() === "") {
    logToOutputChannel("User canceled setOpenaiApiKey command");
    return;
  }

  logToOutputChannel("Saving API Key");
  await setConfigurationValue("apiKey", apiKey);

  return apiKey;
}
