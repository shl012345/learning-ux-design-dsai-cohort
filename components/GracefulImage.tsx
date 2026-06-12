import fs from 'fs';
import path from 'path';

interface GracefulImageProps {
  src: string;
  alt: string;
}

export default function GracefulImage({ src, alt }: GracefulImageProps) {
  const publicPath = path.join(process.cwd(), 'public', src);
  const exists = fs.existsSync(publicPath);

  if (!exists) {
    return (
      <div className="border-2 border-dashed border-border p-12 my-6 text-center font-body bg-transparent">
        <p className="text-muted text-sm italic mb-2">"{alt}"</p>
        <span className="font-mono text-xs text-muted block">
          filename: {src.replace(/^\//, '')}
        </span>
      </div>
    );
  }

  return (
    <div className="my-6">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto max-w-full"
      />
    </div>
  );
}
