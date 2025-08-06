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
    include: { pulls: { include: { author: true } } }
  });
  if (!repoObj) return res.status(404).json({ error: 'repo not found' });
  res.json(repoObj.pulls);
});

router.post('/:owner/:repo', auth, async (req, res) => {
  const { owner, repo } = req.params;
  const { title, body, base, head } = req.body;
  const repoObj = await prisma.repo.findFirst({
    where: { name: repo, owner: { username: owner } }
  });
  if (!repoObj) return res.status(404).json({ error: 'repo not found' });
  const pull = await prisma.pull.create({
    data: { title, body, base, head, repoId: repoObj.id, authorId: req.user.id }
  });
  res.json(pull);
});

router.patch('/:owner/:repo/:id/merge', auth, async (req, res) => {
  const { id } = req.params;
  const pull = await prisma.pull.update({
    where: { id: Number(id) },
    data: { status: 'merged' }
  });
  res.json(pull);
});

export default router;