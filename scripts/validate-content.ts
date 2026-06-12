import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

let errorsCount = 0;
let warningsCount = 0;

const logError = (msg: string) => {
  console.error(`\x1b[31m[ERROR] ${msg}\x1b[0m`);
  errorsCount++;
};

const logWarning = (msg: string) => {
  console.warn(`\x1b[33m[WARNING] ${msg}\x1b[0m`);
  warningsCount++;
};

const lessons: {
  filePath: string;
  slug: string;
  section: string;
  title: string;
  order: number;
  prerequisites: string[];
  realWorldExcerpt?: { file: string };
  content: string;
}[] = [];

const sections: {
  filePath: string;
  slug: string;
  title: string;
  order: number;
  summary: string;
}[] = [];

const CONTENT_DIR = path.join(process.cwd(), 'content');
const LESSONS_DIR = path.join(CONTENT_DIR, 'lessons');
const DIARY_DIR = path.join(CONTENT_DIR, 'build-diary');

if (!fs.existsSync(CONTENT_DIR)) {
  logError(`Content directory does not exist at: ${CONTENT_DIR}`);
  process.exit(1);
}

const sectionFolders: string[] = [];
if (fs.existsSync(LESSONS_DIR)) {
  const lessonSubdirs = fs.readdirSync(LESSONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(LESSONS_DIR, dirent.name));
  sectionFolders.push(...lessonSubdirs);
}
if (fs.existsSync(DIARY_DIR)) {
  sectionFolders.push(DIARY_DIR);
}

for (const folder of sectionFolders) {
  const sectionMdPath = path.join(folder, '_section.md');
  const folderName = path.basename(folder);
  
  if (!fs.existsSync(sectionMdPath)) {
    logError(`Section folder '${folderName}' is missing metadata file _section.md`);
    continue;
  }
  
  try {
    const fileContent = fs.readFileSync(sectionMdPath, 'utf-8');
    const { data: frontmatter } = matter(fileContent);
    
    const requiredSectionFields = ['slug', 'title', 'order', 'summary'];
    for (const field of requiredSectionFields) {
      if (frontmatter[field] === undefined || frontmatter[field] === null || frontmatter[field] === '') {
        logError(`Section metadata in ${sectionMdPath} is missing required field: '${field}'`);
      }
    }
    
    if (frontmatter.slug && frontmatter.slug !== folderName) {
      logError(`Section metadata slug '${frontmatter.slug}' in ${sectionMdPath} does not match folder name '${folderName}'`);
    }
    
    sections.push({
      filePath: sectionMdPath,
      slug: frontmatter.slug || folderName,
      title: frontmatter.title || '',
      order: frontmatter.order || 0,
      summary: frontmatter.summary || '',
    });
    
  } catch (err: any) {
    logError(`Failed to parse section metadata in ${sectionMdPath}: ${err.message}`);
  }
  
  const files = fs.readdirSync(folder).filter(file => file.endsWith('.md') && file !== '_section.md' && !file.startsWith('.'));
  for (const file of files) {
    const filePath = path.join(folder, file);
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content: body } = matter(fileContent);
      const slug = path.basename(file, '.md');
      
      const requiredLessonFields = [
        'title',
        'section',
        'order',
        'duration',
        'difficulty',
        'prerequisites',
        'analogy',
        'tags',
        'summary',
      ];
      for (const field of requiredLessonFields) {
        if (frontmatter[field] === undefined || frontmatter[field] === null || (typeof frontmatter[field] === 'string' && frontmatter[field] === '')) {
          logError(`Lesson ${filePath} is missing required field: '${field}'`);
        }
      }
      
      if (frontmatter.section && frontmatter.section !== folderName) {
        logError(`Lesson ${filePath} section field '${frontmatter.section}' does not match section folder name '${folderName}'`);
      }
      
      if (frontmatter.real_world_excerpt) {
        const rwe = frontmatter.real_world_excerpt;
        const requiredRweFields = ['source', 'file', 'lines', 'caption'];
        for (const rweField of requiredRweFields) {
          if (!rwe[rweField]) {
            logError(`Lesson ${filePath} has incomplete real_world_excerpt. Missing: '${rweField}'`);
          }
        }
        
        if (rwe.file) {
          const excerptFilePath = path.join(process.cwd(), rwe.file);
          if (!fs.existsSync(excerptFilePath)) {
            logError(`Lesson ${filePath} references non-existent excerpt file: '${rwe.file}'`);
          }
        }
      }
      
      lessons.push({
        filePath,
        slug,
        section: frontmatter.section || folderName,
        title: frontmatter.title || '',
        order: frontmatter.order || 0,
        prerequisites: Array.isArray(frontmatter.prerequisites) ? frontmatter.prerequisites : [],
        realWorldExcerpt: frontmatter.real_world_excerpt,
        content: body,
      });
      
    } catch (err: any) {
      logError(`Failed to parse lesson in ${filePath}: ${err.message}`);
    }
  }
}

const lessonsBySection: Record<string, typeof lessons> = {};
for (const lesson of lessons) {
  if (!lessonsBySection[lesson.section]) {
    lessonsBySection[lesson.section] = [];
  }
  lessonsBySection[lesson.section].push(lesson);
}

for (const sectionSlug in lessonsBySection) {
  const sectionLessons = lessonsBySection[sectionSlug];
  const seenOrders = new Set<number>();
  for (const lesson of sectionLessons) {
    if (seenOrders.has(lesson.order)) {
      logError(`Duplicate order value '${lesson.order}' found in section '${sectionSlug}' (duplicate in: ${lesson.filePath})`);
    }
    seenOrders.add(lesson.order);
  }
}

const allLessonSlugs = new Set(lessons.map(l => l.slug));
for (const lesson of lessons) {
  for (const prereq of lesson.prerequisites) {
    if (!allLessonSlugs.has(prereq)) {
      logError(`Lesson ${lesson.filePath} has non-existent prerequisite: '${prereq}'`);
    }
  }
}

const imageRegex = /!\[.*?\]\((.*?)\)/g;
for (const lesson of lessons) {
  let match;
  // Reset regex state just to be safe
  imageRegex.lastIndex = 0;
  while ((match = imageRegex.exec(lesson.content)) !== null) {
    const imageUrl = match[1];
    if (imageUrl.startsWith('/images/')) {
      const publicImagePath = path.join(process.cwd(), 'public', imageUrl);
      if (!fs.existsSync(publicImagePath)) {
        logWarning(`Image '${imageUrl}' referenced in lesson '${lesson.slug}' (${lesson.filePath}) does not exist in public/images/`);
      }
    }
  }
}

const calloutRegex = /<RealWorldCallout\s+[^>]*?file=["'](.*?)["']/g;
for (const lesson of lessons) {
  let match;
  // Reset regex state
  calloutRegex.lastIndex = 0;
  while ((match = calloutRegex.exec(lesson.content)) !== null) {
    const calloutFilePath = match[1];
    const fullPath = path.join(process.cwd(), calloutFilePath);
    if (!fs.existsSync(fullPath)) {
      logError(`Lesson ${lesson.filePath} contains inline RealWorldCallout with non-existent file: '${calloutFilePath}'`);
    }
  }
}

console.log(`\nValidation finished: ${errorsCount} error(s), ${warningsCount} warning(s)`);

if (errorsCount > 0) {
  console.error('\x1b[31mValidation failed. Build blocked.\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32mValidation passed successfully!\x1b[0m');
  process.exit(0);
}
