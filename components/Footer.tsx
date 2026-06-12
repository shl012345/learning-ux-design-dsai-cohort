import config from '../site.config.json';

export default function Footer() {
  const copyright = config.footer.copyright || '';
  return (
    <footer className="border-t border-border py-6 mt-12 text-center text-sm text-muted font-body">
      <p>{copyright}</p>
    </footer>
  );
}
