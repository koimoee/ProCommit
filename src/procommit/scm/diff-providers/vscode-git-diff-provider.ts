import * as vscode from "vscode";

import { getRepositoryFromGitExtension } from "@utils/repository";

import { DiffProvider } from "./diff-provider";
import { GitExtension, Repository } from "../types";

export class VscodeGitDiffProvider implements DiffProvider {
  repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  static async fromGitExtension(gitExtension: vscode.Extension<GitExtension>) {
    const repository = await getRepositoryFromGitExtension(gitExtension);
    return new VscodeGitDiffProvider(repository);
  }

  async getStagedDiff(excludeFiles?: string[]) {
    const diff = await this.repository.diff(true);
    return diff;
  }
}
