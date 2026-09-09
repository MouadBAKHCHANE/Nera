import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QuoteProvider } from "@/components/quote/QuoteModal";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { CallButton } from "@/components/ui/CallButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { seo } from "@/content/seo";

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

const SITE_URL = seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.title,
    template: "%s | NERA",
  },
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: "/" },
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
    // data-scroll-behavior : Next 16 ne neutralise plus `scroll-behavior: smooth` pendant les
    // transitions de route sans cet attribut. Sans lui, un lien du pied de page fait défiler
    // en douceur jusqu'en haut de la nouvelle page au lieu de l'ouvrir directement en haut.
    <html lang="fr-CH" data-scroll-behavior="smooth" className={`${clash.variable} ${satoshi.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <QuoteProvider>
          {children}
          <CookieBanner />
          <CallButton />
        </QuoteProvider>
      </body>
    </html>
  );
}
