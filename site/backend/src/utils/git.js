import { simpleGit } from 'simple-git';
import path from 'path';
import fs from 'fs';

const reposRoot = process.env.REPOS_ROOT || '/app/git-storage';

export function repoPath(owner, repo) {
  return path.join(reposRoot, owner, `${repo}.git`);
}

export async function initBareRepo(owner, repo) {
  const dir = repoPath(owner, repo);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    await simpleGit(dir).init(true);
  }
}

export async function diffBranches(owner, repo, base, head) {
  const dir = repoPath(owner, repo);
  return simpleGit(dir).diff([`${base}..${head}`]);
}