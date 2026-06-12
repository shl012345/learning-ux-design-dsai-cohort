import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface RealWorldExcerpt {
  source: string;
  file: string;
  lines: string;
  caption: string;
  sees_in_depth?: string;
}

export interface LessonMetadata {
  title: string;
  section: string;
  order: number;
  duration: string;
  difficulty: string;
  prerequisites: string[];
  analogy: string;
  tags: string[];
  summary: string;
  real_world_excerpt?: RealWorldExcerpt;
}

export interface Lesson {
  slug: string;
  metadata: LessonMetadata;
  content: string;
}

export interface SectionMetadata {
  slug: string;
  title: string;
  order: number;
  summary: string;
  duration?: string;
  icon?: string;
}

export interface Section {
  metadata: SectionMetadata;
  content: string;
  lessons: Lesson[];
}

export interface Neighbour {
  slug: string;
  title: string;
  section: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');
const LESSONS_DIR = path.join(CONTENT_DIR, 'lessons');
const DIARY_DIR = path.join(CONTENT_DIR, 'build-diary');

const getSectionDirs = () => {
  const dirs: { slug: string; path: string }[] = [];
  
  if (fs.existsSync(LESSONS_DIR)) {
    const subdirs = fs.readdirSync(LESSONS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const subdir of subdirs) {
      const dirPath = path.join(LESSONS_DIR, subdir);
      if (fs.existsSync(path.join(dirPath, '_section.md'))) {
        dirs.push({ slug: subdir, path: dirPath });
      }
    }
  }
  
  if (fs.existsSync(DIARY_DIR)) {
    if (fs.existsSync(path.join(DIARY_DIR, '_section.md'))) {
      dirs.push({ slug: 'build-diary', path: DIARY_DIR });
    }
  }
  
  return dirs;
};

export function getAllSections(): Section[] {
  const dirs = getSectionDirs();
  const sections: Section[] = [];
  
  for (const dir of dirs) {
    const sectionMdPath = path.join(dir.path, '_section.md');
    const sectionFile = fs.readFileSync(sectionMdPath, 'utf-8');
    const { data: frontmatter, content: sectionContent } = matter(sectionFile);
    
    const lessons: Lesson[] = [];
    const files = fs.readdirSync(dir.path)
      .filter(file => file.endsWith('.md') && file !== '_section.md' && !file.startsWith('.'));
      
    for (const file of files) {
      const filePath = path.join(dir.path, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: lessonFrontmatter, content: lessonBody } = matter(fileContent);
      const slug = path.basename(file, '.md');
      
      lessons.push({
        slug,
        metadata: lessonFrontmatter as LessonMetadata,
        content: lessonBody,
      });
    }
    
    lessons.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0));
    
    sections.push({
      metadata: {
        slug: dir.slug,
        title: frontmatter.title || dir.slug,
        order: frontmatter.order || 0,
        summary: frontmatter.summary || '',
        duration: frontmatter.duration,
        icon: frontmatter.icon,
      },
      content: sectionContent,
      lessons,
    });
  }
  
  sections.sort((a, b) => a.metadata.order - b.metadata.order);
  return sections;
}

export function getSection(slug: string): Section | null {
  const sections = getAllSections();
  return sections.find(s => s.metadata.slug === slug) || null;
}

export function getLesson(sectionSlug: string, lessonSlug: string): Lesson | null {
  const section = getSection(sectionSlug);
  if (!section) return null;
  return section.lessons.find(l => l.slug === lessonSlug) || null;
}

export function getNeighbours(sectionSlug: string, lessonSlug: string): { prev: Neighbour | null; next: Neighbour | null } {
  const sections = getAllSections();
  
  if (sectionSlug === 'build-diary') {
    const buildSection = sections.find(s => s.metadata.slug === 'build-diary');
    if (!buildSection) return { prev: null, next: null };
    
    const index = buildSection.lessons.findIndex(l => l.slug === lessonSlug);
    if (index === -1) return { prev: null, next: null };
    
    const prevLesson = index > 0 ? buildSection.lessons[index - 1] : null;
    const nextLesson = index < buildSection.lessons.length - 1 ? buildSection.lessons[index + 1] : null;
    
    return {
      prev: prevLesson ? { slug: prevLesson.slug, title: prevLesson.metadata.title, section: 'build-diary' } : null,
      next: nextLesson ? { slug: nextLesson.slug, title: nextLesson.metadata.title, section: 'build-diary' } : null,
    };
  } else {
    const configPath = path.join(process.cwd(), 'site.config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const primarySectionSlugs: string[] = config.navigation.primary || [];
    
    const flatLessons: Neighbour[] = [];
    
    for (const pSlug of primarySectionSlugs) {
      const sec = sections.find(s => s.metadata.slug === pSlug);
      if (sec) {
        for (const les of sec.lessons) {
          flatLessons.push({
            slug: les.slug,
            title: les.metadata.title,
            section: pSlug,
          });
        }
      }
    }
    
    const index = flatLessons.findIndex(l => l.section === sectionSlug && l.slug === lessonSlug);
    if (index === -1) return { prev: null, next: null };
    
    const prev = index > 0 ? flatLessons[index - 1] : null;
    const next = index < flatLessons.length - 1 ? flatLessons[index + 1] : null;
    
    return { prev, next };
  }
}
