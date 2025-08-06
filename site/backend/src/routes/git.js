import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
const router = express.Router();

const reposRoot = process.env.REPOS_ROOT || '/app/git-storage';

router.all('/:user/:repo.git/*', (req, res) => {
  const { user, repo } = req.params;
  const repoPath = path.join(reposRoot, user, `${repo}.git`);
  if (!fs.existsSync(repoPath)) return res.status(404).send('repo not found');

  const service = req.query.service;
  if (service === 'git-upload-pack') {
    res.set('Content-Type', 'application/x-git-upload-pack-advertisement');
    const ls = spawn('git', ['upload-pack', '--stateless-rpc', '--advertise-refs', repoPath]);
    ls.stdout.pipe(res);
  } else if (service === 'git-receive-pack') {
    res.set('Content-Type', 'application/x-git-receive-pack-advertisement');
    const ls = spawn('git', ['receive-pack', '--stateless-rpc', '--advertise-refs', repoPath]);
    ls.stdout.pipe(res);
  } else {
    res.status(400).send('unsupported');
  }
});
export default router;