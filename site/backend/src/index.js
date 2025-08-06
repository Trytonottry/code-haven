import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repos.js';
import gitRoutes from './routes/git.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/repos', repoRoutes);
app.use('/git', gitRoutes); // smart-http endpoint

app.get('/health', (_, res) => res.send('ok'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));