import * as vscode from "vscode";
import { setConfigurationValue } from "@utils/configuration";
import { logToOutputChannel } from "@utils/output";

export async function setMessageApproveMethod() {
  logToOutputChannel("Starting setMessageApproveMethod command");
  const method = await vscode.window.showQuickPick(["Quick pick", "Message file"], {
    title: "Select the method to approve generated commit messages",
  });

  if (!method) {
    logToOutputChannel("User canceled setMessageApproveMethod command");
    return;
  }

  logToOutputChannel("Saving message approve method configuration");
  await setConfigurationValue("general.messageApproveMethod", method);

  return method;
}
