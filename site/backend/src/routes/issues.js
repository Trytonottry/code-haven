import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'no token' }); }
};

router.get('/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const repoObj = await prisma.repo.findFirst({
    where: { name: repo, owner: { username: owner } },
    include: { issues: { include: { author: true } } }
  });
  if (!repoObj) return res.status(404).json({ error: 'repo not found' });
  res.json(repoObj.issues);
});

router.post('/:owner/:repo', auth, async (req, res) => {
  const { owner, repo } = req.params;
  const { title, body } = req.body;
  const repoObj = await prisma.repo.findFirst({
    where: { name: repo, owner: { username: owner } }
  });
  if (!repoObj) return res.status(404).json({ error: 'repo not found' });
  const issue = await prisma.issue.create({
    data: { title, body, repoId: repoObj.id, authorId: req.user.id }
  });
  res.json(issue);
});

export default router;