import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax RAG Agent',
  description: 'MVP for Malaysian Tax RAG Agent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
