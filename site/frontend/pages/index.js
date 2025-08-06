import axios from 'axios';
import Link from 'next/link';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repos.js';
import pullsRoutes from './routes/pulls.js';
import issuesRoutes from './routes/issues.js';
import wikiRoutes from './routes/wiki.js';
const api = axios.create({ baseURL: 'http://localhost:4000/api' });

app.use('/api/auth', authRoutes);
app.use('/api/repos', repoRoutes);
app.use('/api/pulls', pullsRoutes);
app.use('/api/issues', issuesRoutes);
app.use('/api/wiki', wikiRoutes);

export async function getServerSideProps() {
  const { data } = await api.get('/repos');
  return { props: { repos: data } };
}

export default function Home({ repos }) {
  return (
    <div>
      <h1>Public Repositories</h1>
      <ul>
        {repos.map(r => (
          <li key={r.id}>
            <Link href={`/${r.owner}/${r.name}`}>{r.owner}/{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}