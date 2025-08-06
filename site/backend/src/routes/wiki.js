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

router.get('/:owner/:repo/:slug?', async (req, res) => {
  const { owner, repo, slug = 'home' } = req.params;
  const repoObj = await prisma.repo.findFirst({
    where: { name: repo, owner: { username: owner } }
  });
  if (!repoObj) return res.status(404).json({ error: 'repo not found' });
  const page = await prisma.wikiPage.findUnique({
    where: { repoId_slug: { repoId: repoObj.id, slug } }
  });
  res.json(page || { slug, title: slug, content: '' });
});

router.post('/:owner/:repo/:slug', auth, async (req, res) => {
  const { owner, repo, slug } = req.params;
  const { title, content } = req.body;
  const repoObj = await prisma.repo.findFirst({
    where: { name: repo, owner: { username: owner } }
  });
  if (!repoObj) return res.status(404).json({ error: 'repo not found' });
  const page = await prisma.wikiPage.upsert({
    where: { repoId_slug: { repoId: repoObj.id, slug } },
    update: { title, content },
    create: { repoId: repoObj.id, slug, title, content }
  });
  res.json(page);
});

export default router;