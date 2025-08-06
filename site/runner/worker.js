import { simpleGit } from 'simple-git';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const BACKEND = process.env.BACKEND || 'http://backend:4000';
const REPOS_ROOT = '/git-storage';

async function poll() {
  const { data } = await axios.get(`${BACKEND}/api/ci/queue`);
  if (!data.length) return setTimeout(poll, 5000);

  const job = data[0];
  const { owner, repo, commit } = job;
  const dir = path.join(REPOS_ROOT, owner, `${repo}.git`);

  const git = simpleGit(dir);
  await git.checkout(commit);

  const steps = JSON.parse(fs.readFileSync(path.join(dir, '.gitmvp/workflows/ci.json'), 'utf8')).steps;
  for (const step of steps) {
    console.log(`[RUNNER] ${step.name}`);
    const { spawn } = await import('child_process');
    const proc = spawn('sh', ['-c', step.run], { cwd: dir });
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    await new Promise(res => proc.on('close', res));
  }

  await axios.post(`${BACKEND}/api/ci/result`, { jobId: job.id, status: 'success' });
  poll();
}

poll();