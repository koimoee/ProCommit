import * as vscode from "vscode";

import { GitExtension } from "@procommit/scm/types";

export async function getRepositoryFromGitExtension(
  gitExtension: vscode.Extension<GitExtension>
) {
  if (!gitExtension.isActive) {
    throw new Error("Git extension is not active");
  }

  const api = gitExtension.exports.getAPI(1);
  const repositories = api.repositories;

  if (repositories.length === 0) {
    throw new Error("No repositories found");
  }

  // If only one repository, return it
  if (repositories.length === 1) return repositories[0];

  // Try to find repository for active editor
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const folder = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
    if (folder) {
      const found = repositories.find((r) => {
        try {
          const root = r.rootUri?.fsPath ?? r.rootUri?.path;
          return root === folder.uri.fsPath || root === folder.uri.path;
        } catch (e) {
          return false;
        }
      });
      if (found) return found;
    }
  }

  // Ask user to pick a repository when multiple repositories are present
  const picks = repositories.map((r, idx) => {
    const label = r.rootUri?.fsPath ?? r.rootUri?.path ?? `Repository ${idx + 1}`;
    return {
      label,
      idx,
    };
  });

  const selection = await vscode.window.showQuickPick(
    picks.map((p) => ({ label: p.label, description: "" })),
    {
      placeHolder: "Select a repository to use for ProCommit",
    }
  );

  if (!selection) {
    throw new Error("Repository selection cancelled");
  }

  const selected = picks.find((p) => p.label === selection.label);
  if (!selected) throw new Error("Repository selection failed");

  return repositories[selected.idx];
}
