import Link from 'next/link';
import config from '../site.config.json';
import { getSection } from '@/lib/content';

export default function Home() {
  const title = config.site.title || "The DSAI Companion Reader";
  const tagline = config.site.tagline || "Read this alongside your first cohort";
  const description = config.site.description || "";
  const primarySectionSlugs: string[] = config.navigation.primary || [];

  const sections = primarySectionSlugs
    .map(slug => getSection(slug))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-[36px] font-bold leading-tight text-foreground">{title}</h1>
        <p className="text-xl font-semibold text-accent italic">{tagline}</p>
        {description && <p className="text-muted text-lg mt-4 leading-relaxed">{description}</p>}
      </section>

      <section className="space-y-8">
        <h2 className="text-[26px] font-bold text-foreground border-b border-border pb-2">Lessons by Section</h2>
        <div className="space-y-10">
          {sections.map((section, idx) => {
            const { slug, title: secTitle, summary, icon, duration } = section.metadata;
            return (
              <div key={slug} className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{icon || '📖'}</span>
                  <h3 className="text-[20px] font-bold">
                    <Link href={`/lessons/${slug}`} className="text-accent hover:text-accent-hover no-underline">
                      {idx + 1}. {secTitle}
                    </Link>
                  </h3>
                  {duration && <span className="text-xs text-muted font-mono ml-auto">{duration}</span>}
                </div>
                <p className="text-muted leading-relaxed pl-8">{summary}</p>
                <ul className="pl-14 space-y-2 list-decimal">
                  {section.lessons.map(lesson => (
                    <li key={lesson.slug} className="text-muted">
                      <Link href={`/lessons/${slug}/${lesson.slug}`} className="text-accent hover:text-accent-hover no-underline font-medium">
                        {lesson.metadata.title}
                      </Link>
                      <span className="text-xs text-muted font-mono ml-2">({lesson.metadata.duration})</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
