import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSection, getAllSections } from '@/lib/content';

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  const sections = getAllSections();
  return sections
    .filter(s => s.metadata.slug !== 'build-diary')
    .map(s => ({ section: s.metadata.slug }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: sectionSlug } = await params;
  const section = getSection(sectionSlug);

  if (!section || sectionSlug === 'build-diary') {
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
          <span className="text-3xl">{icon || '📖'}</span>
          <h1 className="text-[36px] font-bold leading-tight">{title}</h1>
          {duration && <span className="text-xs text-muted font-mono ml-auto">{duration}</span>}
        </div>
        <p className="text-xl font-semibold italic text-accent">{summary}</p>
      </div>

      <div className="text-muted leading-relaxed whitespace-pre-line">
        {section.content}
      </div>

      <div className="space-y-4 pt-6">
        <h2 className="text-[26px] font-bold text-foreground">Lessons</h2>
        <div className="space-y-6">
          {section.lessons.map(lesson => (
            <div key={lesson.slug} className="border border-border p-5 bg-transparent space-y-2">
              <h3 className="text-[20px] font-bold">
                <Link href={`/lessons/${sectionSlug}/${lesson.slug}`} className="text-accent hover:text-accent-hover no-underline">
                  {lesson.metadata.title}
                </Link>
              </h3>
              <p className="text-muted text-sm leading-relaxed">{lesson.metadata.summary}</p>
              <div className="flex items-center gap-4 text-xs text-muted font-mono pt-1">
                <span>Duration: {lesson.metadata.duration}</span>
                <span>Difficulty: {lesson.metadata.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
