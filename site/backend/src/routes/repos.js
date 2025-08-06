// src/routes/repos.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { simpleGit } from 'simple-git';
const prisma = new PrismaClient();
const router = express.Router();

const reposRoot = process.env.REPOS_ROOT || '/app/git-storage';

// middleware авторизации
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'no token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'invalid token' });
  }
};

// список публичных репозиториев
router.get('/', async (_, res) => {
  const repos = await prisma.repo.findMany({
    where: { isPrivate: false },
    include: { owner: { select: { username: true } } },
  });
  res.json(repos);
});

// мои репозитории
router.get('/my', auth, async (req, res) => {
  const repos = await prisma.repo.findMany({
    where: { ownerId: req.user.id },
    include: { owner: { select: { username: true } } },
  });
  res.json(repos);
});

// создать репозиторий
router.post('/', auth, async (req, res) => {
  const { name, isPrivate = false } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });

  try {
    const repo = await prisma.repo.create({
      data: { name, ownerId: req.user.id, isPrivate: Boolean(isPrivate) },
    });

    const repoPath = path.join(reposRoot, req.user.username, `${name}.git`);
    fs.mkdirSync(repoPath, { recursive: true });
    await simpleGit(repoPath).init(true); // bare repo

    res.json(repo);
  } catch (e) {
    console.error(e);
    res.status(409).json({ error: 'repository already exists' });
  }
});

// удалить репозиторий
router.delete('/:owner/:name', auth, async (req, res) => {
  const { owner, name } = req.params;
  if (owner !== req.user.username) return res.status(403).json({ error: 'forbidden' });

  await prisma.repo.deleteMany({ where: { name, ownerId: req.user.id } });
  const repoPath = path.join(reposRoot, owner, `${name}.git`);
  fs.rmSync(repoPath, { recursive: true, force: true });

  res.sendStatus(204);
});

export default router;