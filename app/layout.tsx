import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "../site.config.json";

export const metadata: Metadata = {
  title: {
    default: config.site.title || "The DSAI Companion Reader",
    template: `%s | ${config.site.title}`,
  },
  description: config.site.description || "A self-paced reader for adults moving into data science and AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={config.site.language || "en"} className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground font-body antialiased">
        <Header />
        <main className="flex-1 w-full max-w-[680px] mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
