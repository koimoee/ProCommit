import * as vscode from "vscode";
import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setLanguage() {
  logToOutputChannel("Starting setLanguage command");
  const language = await vscode.window.showQuickPick(["English", "Japanese", "Korean", "German", "Russian"], {
    title: "Select the language for commit messages",
  });

  if (!language) {
    logToOutputChannel("User canceled setLanguage command");
    return;
  }

  logToOutputChannel("Saving language configuration");
  await setConfigurationValue("general.language", language);

  return language;
}
