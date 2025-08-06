import { simpleGit } from 'simple-git';
import { spawn } from 'child_process';
import path from 'path';
import { audit } from '../utils/security.js';

const reposRoot = process.env.REPOS_ROOT || '/git-storage';

export async function runWorkflow(owner, repo, commit) {
  const dir = path.join(reposRoot, owner, `${repo}.git`);
  const workflowPath = path.join(dir, '.gitmvp/workflows/ci.yml');
  if (!require('fs').existsSync(workflowPath)) return;

  const git = simpleGit(dir);
  await git.checkout(commit);

  const runner = spawn('docker', ['run', '--rm', '-v', `${dir}:/src`, 'alpine', 'sh', '-c', 'echo build && echo test']);
  runner.stdout.on('data', d => console.log(d.toString()));
  runner.on('close', code => {
    audit('runner', 'workflow_end', { owner, repo, commit, exitCode: code });
  });
}