import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: "Vazquez Estudio Penal — Abogado Penal en Salta",
  description:
    "Estudio jurídico especializado en defensa penal en Salta, Argentina. Delitos complejos, defensa en juicio y asesoría preventiva. Consultá ahora.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
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
    url: SITE_URL,
    siteName: "Vazquez Estudio Penal",
  },
  twitter: {
    card: "summary",
    title: "Vazquez Estudio Penal — Abogado Penal en Salta",
    description:
      "Defensa penal en Salta, Argentina. Consultá con Vazquez Estudio Penal.",
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
