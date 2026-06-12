import Link from 'next/link';
import config from '@/site.config.json';

export default function AboutPage() {
  const author = config.author;

  return (
    <div className="space-y-6">
      <Link href="/" className="text-accent hover:text-accent-hover text-sm no-underline">
        ← Back to Home
      </Link>
      <h1 className="text-[36px] font-bold leading-tight text-foreground">About the Author</h1>
      <div className="border border-border p-6 bg-transparent space-y-4">
        <h2 className="text-[20px] font-bold text-foreground">{author.name}</h2>
        {author.bio && <p className="text-muted leading-relaxed">{author.bio}</p>}
        {author.email && (
          <div className="text-sm">
            <span className="text-muted">Contact: </span>
            <a href={`mailto:${author.email}`} className="text-accent hover:text-accent-hover no-underline font-medium">
              {author.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
