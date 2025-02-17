import { Geist, Geist_Mono } from "next/font/google";
import { LayoutDocument, type SiteLocale } from "@/graphql/types/graphql";
import { request } from "@/lib/datocms";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/../i18n/routing";
import { PostHogProvider } from "@/lib/PostHogProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: SiteLocale;
}) {
  // Providing all messages to the client side
  const messages = await getMessages();

  const data = await request(LayoutDocument, {
    locale: locale,
    fallbackLocale: [routing.defaultLocale],
  });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            <Header data={data} />
            {children}
            <Footer data={data} />
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
