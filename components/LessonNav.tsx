import Link from 'next/link';
import { Neighbour } from '@/lib/content';

interface LessonNavProps {
  prev: Neighbour | null;
  next: Neighbour | null;
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav className="border-t border-border mt-12 pt-6 flex justify-between gap-4 font-body text-sm">
      <div>
        {prev && (
          <Link
            href={prev.section === 'build-diary' ? `/build/${prev.slug}` : `/lessons/${prev.section}/${prev.slug}`}
            className="text-accent hover:text-accent-hover no-underline flex flex-col items-start"
          >
            <span className="text-muted text-xs">← Previous</span>
            <span className="font-semibold">{prev.title}</span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={next.section === 'build-diary' ? `/build/${next.slug}` : `/lessons/${next.section}/${next.slug}`}
            className="text-accent hover:text-accent-hover no-underline flex flex-col items-end text-right"
          >
            <span className="text-muted text-xs">Next →</span>
            <span className="font-semibold">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
