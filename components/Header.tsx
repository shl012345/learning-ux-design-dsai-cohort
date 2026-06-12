import Link from 'next/link';
import config from '@/site.config.json';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const logoText = config.branding.logoText || 'DSAI Reader';
  const showBuildDiary = config.features.showBuildDiary;
  const showDarkMode = config.features.showDarkMode;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border py-4 px-6 md:px-12 flex items-center justify-between">
      <Link href="/" className="font-body font-bold text-lg text-foreground no-underline">
        {logoText}
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/" className="text-foreground hover:text-accent font-body no-underline">
          Home
        </Link>
        {showBuildDiary && (
          <Link href="/build" className="text-foreground hover:text-accent font-body no-underline">
            Build Diary
          </Link>
        )}
        {config.features.showAboutPage && (
          <Link href="/about" className="text-foreground hover:text-accent font-body no-underline">
            About
          </Link>
        )}
        {showDarkMode && <DarkModeToggle />}
      </nav>
    </header>
  );
}
