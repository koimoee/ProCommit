import * as vscode from "vscode";

const outputChannel = vscode.window.createOutputChannel("ProCommit");

export function logToOutputChannel(message: string) {
  outputChannel.appendLine(`ProCommit: ${message}`);
}
