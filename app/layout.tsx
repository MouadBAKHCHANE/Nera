import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QuoteProvider } from "@/components/quote/QuoteModal";

const clash = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});

const SITE_URL = "https://www.nera-ing.ch";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NERA Ingénieurs Conseils | Bureau d'ingénieurs en énergie et physique du bâtiment à Genève",
    template: "%s | NERA Ingénieurs Conseils",
  },
  description:
    "Bureau d'ingénieurs conseils indépendant à Genève : audits CECB, physique du bâtiment, CVC, rénovation énergétique, Minergie, autorisations de construire et subventions. Suisse romande.",
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: "NERA Ingénieurs Conseils",
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr-CH" className={`${clash.variable} ${satoshi.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
