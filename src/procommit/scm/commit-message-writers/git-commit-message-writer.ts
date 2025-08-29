import * as vscode from "vscode";

import { GitExtension, Repository } from "@procommit/scm/types";
import { getRepositoryFromGitExtension } from "@utils/repository";

import { CommitMessageWriter } from "./commit-message-writer";

export class GitCommitMessageWriter implements CommitMessageWriter {
  repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  static async fromGitExtension(gitExtension: vscode.Extension<GitExtension>) {
    const repository = await getRepositoryFromGitExtension(gitExtension);
    return new GitCommitMessageWriter(repository);
  }

  async write(message: string) {
    this.repository.inputBox.value = message;
  }
}
