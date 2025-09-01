/*
 * This code includes portions of code from the aicommits project, which is
 * licensed under the MIT License. Copyright (c) Hassan El Mghari.
 * The original code can be found at https://github.com/Nutlope/aicommits/blob/develop/src/utils/git.ts.
 */

import { execa } from "execa";
import * as vscode from "vscode";

import { DiffProvider } from "./diff-provider";

/**
 * Resolve a working directory for git commands in multi-root workspaces.
 * Priority:
 * 1. Repository root from the Git extension (if provided)
 * 2. Workspace folder for the active text editor
 * 3. First workspace folder
 * 4. undefined (let git run in extension process cwd)
 */
function resolveCwdFromContext(gitExtension?: any): string | undefined {
  try {
    // If gitExtension exposes repositories, prefer the first repository root
    if (gitExtension && Array.isArray(gitExtension.repositories) && gitExtension.repositories.length > 0) {
      const repo = gitExtension.repositories[0];
      if (repo && repo.rootUri) {
        return repo.rootUri.fsPath ?? repo.rootUri.path;
      }
    }

    // If there's an active text editor, use its workspace folder
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const folder = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
      if (folder) return folder.uri.fsPath ?? folder.uri.path;
    }

    // Fallback to first workspace folder
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
      return vscode.workspace.workspaceFolders[0].uri.fsPath ?? vscode.workspace.workspaceFolders[0].uri.path;
    }
  } catch (e) {
    // ignore and return undefined
  }

  return undefined;
}

const excludeFromDiff = (path: string) => `:(exclude)${path}`;

const filesToExclude = [
  "package-lock.json",
  "pnpm-lock.yaml",

  // yarn.lock, Cargo.lock, Gemfile.lock, Pipfile.lock, etc.
  "*.lock",
].map(excludeFromDiff);

/**
 * @deprecated This class is deprecated. Use `VscodeGitDiffProvider` instead.
 */
export class ExecaGitDiffProvider implements DiffProvider {
  async getStagedDiff(excludeFiles?: string[]) {
    const diffCached = ["diff", "--cached"];
    const { stdout: diff } = await execa("git", [...diffCached, ...filesToExclude], {
      cwd: resolveCwdFromContext(),
    });

    return diff;
  }
}
