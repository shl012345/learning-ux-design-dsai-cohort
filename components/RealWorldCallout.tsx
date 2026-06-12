import fs from 'fs';
import path from 'path';

interface RealWorldCalloutProps {
  file: string;
  lines: string;
  caption: string;
}

export default function RealWorldCallout({ file, lines, caption }: RealWorldCalloutProps) {
  const filePath = path.join(process.cwd(), file);
  let fileContent = '';

  if (fs.existsSync(filePath)) {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const [startStr, endStr] = lines.split('-');
    const start = parseInt(startStr, 10) || 1;
    const end = parseInt(endStr, 10) || start;
    const allLines = rawContent.split('\n');
    fileContent = allLines.slice(start - 1, end).join('\n');
  } else {
    fileContent = `// File not found: ${file}`;
  }

  const fileName = path.basename(file);

  return (
    <div className="border border-border my-6 bg-code-bg p-4 font-body">
      <div className="flex justify-between items-center text-xs text-muted font-mono mb-2 pb-2 border-b border-border">
        <span>{fileName}</span>
        <span>Lines {lines}</span>
      </div>
      <pre className="font-code text-[15px] text-foreground overflow-x-auto whitespace-pre leading-relaxed">
        <code>{fileContent}</code>
      </pre>
      {caption && (
        <div className="mt-3 text-xs text-muted border-t border-border pt-2 font-body">
          {caption}
        </div>
      )}
    </div>
  );
}
