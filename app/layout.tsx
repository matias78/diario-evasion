import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutContent from "@/components/LayoutContent";

export const metadata: Metadata = {
  title: {
    default: "Diario de Evasión | Blog de Nico Dalmasso",
    template: "%s | Diario de Evasión"
  },
  description: "Reflexiones sobre libros, música y la vida. Un espacio para compartir aventuras y momentos de escape.",
  keywords: ["blog", "libros", "música", "reflexiones", "escritura", "viajes"],
  authors: [{ name: "Nico Dalmasso" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Diario de Evasión",
    title: "Diario de Evasión",
    description: "Reflexiones sobre libros, música y la vida"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
