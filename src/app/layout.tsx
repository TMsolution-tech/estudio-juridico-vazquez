import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vazquez Estudio Penal — Abogado Penal en Salta",
  description:
    "Estudio jurídico especializado en defensa penal en Salta, Argentina. Delitos complejos, defensa en juicio y asesoría preventiva. Consultá ahora.",
  keywords: [
    "abogado penal Salta",
    "defensa penal",
    "estudio jurídico Salta",
    "Ariel Vazquez abogado",
  ],
  openGraph: {
    title: "Vazquez Estudio Penal — Abogado Penal Salta",
    description: "Defensa penal efectiva en Salta. Consultá ahora.",
    type: "website",
    locale: "es_AR",
  },
  other: {
    "supported-color-schemes": "light",
    nightmode: "disable",
    "x5-night-mode": "disable",
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
