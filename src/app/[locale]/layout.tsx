import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s` },
  description:
    "The Women's Trucking Federation of Canada is a national non-profit empowering women, expanding opportunities, and inspiring youth to see trucking as a modern, rewarding career.",
  applicationName: SITE.shortName,
  keywords: [
    "women in trucking",
    "trucking Canada",
    "WTFC",
    "female truck drivers",
    "trucking mentorship",
    "transportation careers",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description:
      "Empowering women in trucking. Safety, opportunity, and inclusion across the Canadian trucking sector.",
    images: [
      {
        url: "/images/hero-group.jpg",
        width: 1600,
        height: 900,
        alt: "Members of the Women's Trucking Federation of Canada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: "Empowering women in trucking across Canada.",
    images: ["/images/hero-group.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#c62fa0",
  colorScheme: "light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * This is the application's root layout. There is deliberately no
 * `app/layout.tsx` — with `localePrefix: "always"` the locale segment sits at
 * the top of the tree, so this file owns `<html>` and the message provider.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={poppins.variable}>
      <body className="min-h-dvh bg-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100"
          >
            Skip to main content
          </a>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}