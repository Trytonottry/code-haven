import { useState } from 'react';
import dynamic from 'next/dynamic';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor({ value, onChange }) {
  return <MDEditor value={value} onChange={onChange} height={300} />;
}