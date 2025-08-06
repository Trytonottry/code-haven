export default function SecurityBadge({ level }) {
  const color = level === 'high' ? 'red' : level === 'medium' ? 'orange' : 'green';
  return <span style={{ color, fontWeight: 'bold' }}>Безопасность: {level}</span>;
}