import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLesson, getNeighbours, getAllSections } from '@/lib/content';
import RealWorldCallout from '@/components/RealWorldCallout';
import LessonNav from '@/components/LessonNav';

interface LessonPageProps {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateStaticParams() {
  const sections = getAllSections();
  const params: { section: string; slug: string }[] = [];
  
  for (const section of sections) {
    if (section.metadata.slug !== 'build-diary') {
      for (const lesson of section.lessons) {
        params.push({
          section: section.metadata.slug,
          slug: lesson.slug,
        });
      }
    }
  }
  return params;
}

export const dynamicParams = false;

export default async function LessonPage({ params }: LessonPageProps) {
  const { section: sectionSlug, slug: lessonSlug } = await params;
  const lesson = getLesson(sectionSlug, lessonSlug);

  if (!lesson) {
    notFound();
  }

  const { title, duration, difficulty, analogy, prerequisites, real_world_excerpt } = lesson.metadata;
  const { prev, next } = getNeighbours(sectionSlug, lessonSlug);

  let ContentComponent;
  try {
    const mdxModule = await import(`@/content/lessons/${sectionSlug}/${lessonSlug}.md`);
    ContentComponent = mdxModule.default;
  } catch (err) {
    console.error(`Error loading MDX file:`, err);
    notFound();
  }

  const prereqDetails = prerequisites.map(pSlug => {
    const sections = getAllSections();
    for (const sec of sections) {
      const found = sec.lessons.find(l => l.slug === pSlug);
      if (found) {
        return {
          slug: pSlug,
          title: found.metadata.title,
          section: sec.metadata.slug,
        };
      }
    }
    return { slug: pSlug, title: pSlug, section: sectionSlug };
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href={`/lessons/${sectionSlug}`} className="text-accent hover:text-accent-hover text-sm no-underline">
          ← Back to Section
        </Link>
        
        <h1 className="text-[36px] font-bold leading-tight text-foreground">{title}</h1>
        
        <div className="flex flex-wrap gap-4 text-xs text-muted font-mono border-b border-border pb-4">
          <span>Duration: {duration}</span>
          <span>Difficulty: {difficulty}</span>
          {analogy && <span className="italic">Analogy: {analogy}</span>}
        </div>
      </div>

      {prereqDetails.length > 0 && (
        <div className="bg-code-bg border-l-4 border-accent p-4 text-sm font-body my-4">
          <span className="font-semibold block mb-1">Before you start this lesson:</span>
          <ul className="list-disc pl-5 space-y-1">
            {prereqDetails.map(prereq => (
              <li key={prereq.slug}>
                <Link href={`/lessons/${prereq.section}/${prereq.slug}`} className="text-accent hover:text-accent-hover no-underline font-medium">
                  {prereq.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {real_world_excerpt ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 text-foreground leading-relaxed font-body">
            <ContentComponent />
          </div>

          <aside className="lg:col-span-1 border border-border p-4 bg-code-bg space-y-4">
            <h3 className="text-sm font-bold border-b border-border pb-2 text-foreground font-body">
              Real-World Excerpt
            </h3>
            <RealWorldCallout
              file={real_world_excerpt.file}
              lines={real_world_excerpt.lines}
              caption={real_world_excerpt.caption}
            />
            {real_world_excerpt.sees_in_depth && (
              <div className="text-xs text-muted pt-2 border-t border-border font-body">
                <span>See in-depth in: </span>
                <Link
                  href={`/lessons/${real_world_excerpt.sees_in_depth}`}
                  className="text-accent hover:text-accent-hover font-semibold no-underline"
                >
                  {real_world_excerpt.sees_in_depth.split('/').pop()?.replace(/-/g, ' ')}
                </Link>
              </div>
            )}
          </aside>
        </div>
      ) : (
        <div className="space-y-6 text-foreground leading-relaxed font-body">
          <ContentComponent />
        </div>
      )}

      <LessonNav prev={prev} next={next} />
    </div>
  );
}
