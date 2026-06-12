import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSection } from '@/lib/content';

export default function BuildDiaryIndex() {
  const section = getSection('build-diary');

  if (!section) {
    notFound();
  }

  const { title, summary, icon, duration } = section.metadata;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href="/" className="text-accent hover:text-accent-hover text-sm no-underline">
          ← Back to Home
        </Link>
        <div className="flex items-baseline gap-2 border-b border-border pb-4">
          <span className="text-3xl">{icon || '🛠️'}</span>
          <h1 className="text-[36px] font-bold leading-tight">{title}</h1>
          {duration && <span className="text-xs text-muted font-mono ml-auto">{duration}</span>}
        </div>
        <p className="text-xl font-semibold italic text-accent">{summary}</p>
      </div>

      <div className="text-muted leading-relaxed whitespace-pre-line">
        {section.content}
      </div>

      <div className="space-y-4 pt-6">
        <h2 className="text-[26px] font-bold text-foreground">Entries</h2>
        <div className="space-y-6">
          {section.lessons.map(entry => (
            <div key={entry.slug} className="border border-border p-5 bg-transparent space-y-2">
              <h3 className="text-[20px] font-bold">
                <Link href={`/build/${entry.slug}`} className="text-accent hover:text-accent-hover no-underline">
                  {entry.metadata.title}
                </Link>
              </h3>
              <p className="text-muted text-sm leading-relaxed">{entry.metadata.summary}</p>
              <div className="flex items-center gap-4 text-xs text-muted font-mono pt-1">
                <span>Duration: {entry.metadata.duration}</span>
                <span>Difficulty: {entry.metadata.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
