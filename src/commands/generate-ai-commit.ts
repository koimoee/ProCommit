import * as vscode from "vscode";
import { randomUUID } from "crypto";
import { tmpdir } from "os";
import * as path from "path";

import { getConfiguration } from "@utils/configuration";
import { GitExtension } from "@procommit/scm/types";
import { GitCommitMessageWriter, VscodeGitDiffProvider } from "@procommit/scm";
import { GenerateCompletionFlow } from "@flows";
// Removed duplicate import
import { ChatgptMsgGenerator, GeminiMsgGenerator } from "@procommit/commit-msg-gen";
import { runTaskWithTimeout } from "@utils/timer";
import { logToOutputChannel } from "@utils/output";
import { isValidApiKey } from "@utils/text";

async function openTempFileWithMessage(message: string) {
  const uid = randomUUID();
  const tempMessageFile = path.join(tmpdir(), `vscode-procommit-${uid}.txt`);

  logToOutputChannel(`Opening temp file: ${tempMessageFile}`);

  const explainingHeader = `# This is a generated commit message. You can edit it and save to approve it #\n\n`;
  const tempFileContent = explainingHeader + message;

  await vscode.workspace.fs.writeFile(
    vscode.Uri.file(tempMessageFile),
    Buffer.from(tempFileContent, "utf8")
  );

  const document = await vscode.workspace.openTextDocument(tempMessageFile);

  await vscode.window.showTextDocument(document, {
    preview: false,
  });

  let saveHandler: vscode.Disposable | undefined;
  let closeHandler: vscode.Disposable | undefined;

  const result = await new Promise<{
    result: boolean;
    edited: boolean;
    editedMessage?: string;
  }>((resolve) => {
    saveHandler = vscode.workspace.onDidSaveTextDocument((doc) => {
      if (doc.fileName === tempMessageFile) {
        const editedText = doc.getText();
        const editedMessage = editedText.replace(/#.*#.*\n/g, "").trim();

        resolve({
          result: true,
          edited: true,
          editedMessage: editedMessage,
        });
      }
    });

    closeHandler = vscode.window.onDidChangeVisibleTextEditors((editors) => {
      if (
        editors.every((editor) => editor.document.fileName !== tempMessageFile)
      ) {
        resolve({
          result: false,
          edited: false,
        });
      }
    });
  });

  logToOutputChannel(`Open file result: ${JSON.stringify(result)}`);

  saveHandler?.dispose();
  closeHandler?.dispose();

  logToOutputChannel(`Deleting temp file: ${tempMessageFile}`);
  await vscode.workspace.fs.delete(vscode.Uri.file(tempMessageFile));

  return result;
}

export async function generateAiCommitCommand() {
  try {
    logToOutputChannel("Starting generateAiCommitCommand");

    const gitExtension = vscode.extensions.getExtension<GitExtension>("vscode.git");

    if (!gitExtension) {
      throw new Error("Git extension is not installed");
    }

    if (!gitExtension.isActive) {
      logToOutputChannel("Activating git extension");
      await gitExtension.activate();
    }

    if (!isValidApiKey()) {
      logToOutputChannel("OpenAI API Key is not set. Asking user to set it.");
      await vscode.commands.executeCommand("procommit.setOpenAIApiKey");
    }

    if (!isValidApiKey()) {
      throw new Error("You should set OpenAi API Key before using extension!");
    }

    const configuration = getConfiguration();

    const commitMessageWriter = new GitCommitMessageWriter(gitExtension);
    let messageGenerator;
    const apiKey = configuration.apiKey || "";
    const endpoint = configuration.endpoint || "";
    switch (configuration.general.generator) {
      case "Gemini": {
        const { GeminiMsgGenerator } = await import("@procommit/commit-msg-gen");
        messageGenerator = new GeminiMsgGenerator({ apiKey, endpoint });
        break;
      }
      case "Ollama": {
        const { OllamaMsgGenerator } = await import("@procommit/commit-msg-gen");
        messageGenerator = new OllamaMsgGenerator({ apiKey, endpoint });
        break;
      }
      case "LMStudio": {
        const { LMStudioMsgGenerator } = await import("@procommit/commit-msg-gen");
        messageGenerator = new LMStudioMsgGenerator({ apiKey, endpoint });
        break;
      }
      case "Smithery": {
        const { SmitheryMsgGenerator } = await import("@procommit/commit-msg-gen");
        messageGenerator = new SmitheryMsgGenerator({ apiKey, endpoint });
        break;
      }
      case "Custom": {
        const { CustomMsgGenerator } = await import("@procommit/commit-msg-gen");
        messageGenerator = new CustomMsgGenerator({ endpoint });
        break;
      }
      case "ChatGPT":
      default: {
        messageGenerator = new ChatgptMsgGenerator();
        break;
      }
    }
    const diffProvider = new VscodeGitDiffProvider(gitExtension);

    const generateCompletionFlow = new GenerateCompletionFlow(
      messageGenerator,
      diffProvider,
      commitMessageWriter,
      async (message: string | string[]) => {
        const messages = Array.isArray(message) ? message : [message];
        switch (configuration.general.messageApproveMethod) {
          case "Quick pick":
            if (configuration.general.useMultipleResults) {
              const quickPickItems = messages.map((msg: string, index: number) => ({
                label: `Result ${index + 1}`,
                detail: msg,
              }));

              const quickPickResults = await vscode.window.showQuickPick(
                quickPickItems,
                {
                  title: "Select commit messages",
                  canPickMany: false,
                }
              );

              return {
                result: quickPickResults !== undefined,
                edited: false,
              };
            } else {
              const quickPickResult = await vscode.window.showQuickPick(
                [
                  { label: "Yes", detail: messages[0] },
                  { label: "No" }
                ],
                {
                  title: "Use this commit message?"
                }
              );

              return {
                result: quickPickResult?.label === "Yes",
                edited: false,
              };
            }
          case "Message file":
            const openFileResult = await openTempFileWithMessage(messages[0]);
            return openFileResult;
          default:
            return {
              result: true,
              edited: false,
            };
        }
      }
    );

    logToOutputChannel("Running generateCompletionFlow");

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        cancellable: false,
        title: "Generating ProCommit",
      },
      async (progress) => {
        let increment = 0;

        runTaskWithTimeout(
          () => {
            progress.report({ increment: (increment += 1) });
          },
          5000,
          200
        );

        await generateCompletionFlow.run({});
      }
    );
  } catch (error: any) {
    if (error.isAxiosError && error.response?.data?.error?.message) {
      logToOutputChannel(`API error: ${error.response.data.error.message}`);
      vscode.window.showErrorMessage(`API error: ${error.response.data.error.message}`);
      return;
    }

    if (error instanceof Error) {
      logToOutputChannel(`Error: ${error.message}`);
      vscode.window.showErrorMessage(error.message);
      return;
    }

    logToOutputChannel(`Something went wrong. Please try again.`);
    vscode.window.showErrorMessage("Something went wrong. Please try again.");
    return;
  }
}
