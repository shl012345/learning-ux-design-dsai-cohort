import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLesson, getNeighbours, getSection } from '@/lib/content';
import LessonNav from '@/components/LessonNav';

interface BuildDiaryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const section = getSection('build-diary');
  if (!section) return [];
  return section.lessons.map(lesson => ({
    slug: lesson.slug,
  }));
}

export const dynamicParams = false;

export default async function BuildDiaryPage({ params }: BuildDiaryPageProps) {
  const { slug } = await params;
  const lesson = getLesson('build-diary', slug);

  if (!lesson) {
    notFound();
  }

  const { title, duration, difficulty, analogy } = lesson.metadata;
  const { prev, next } = getNeighbours('build-diary', slug);

  let ContentComponent;
  try {
    const mdxModule = await import(`@/content/build-diary/${slug}.md`);
    ContentComponent = mdxModule.default;
  } catch (err) {
    console.error(`Error loading MDX file:`, err);
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href="/build" className="text-accent hover:text-accent-hover text-sm no-underline">
          ← Back to Build Diary
        </Link>
        
        <h1 className="text-[36px] font-bold leading-tight text-foreground">{title}</h1>
        
        <div className="flex flex-wrap gap-4 text-xs text-muted font-mono border-b border-border pb-4">
          <span>Duration: {duration}</span>
          <span>Difficulty: {difficulty}</span>
          {analogy && <span className="italic">Analogy: {analogy}</span>}
        </div>
      </div>

      <div className="space-y-6 text-foreground leading-relaxed font-body">
        <ContentComponent />
      </div>

      <LessonNav prev={prev} next={next} />
    </div>
  );
}
