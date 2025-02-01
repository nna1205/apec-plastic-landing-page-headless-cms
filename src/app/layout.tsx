import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { request } from "@/lib/datocms";
import {
  LayoutDocument,
  LayoutRecord,
  type SiteLocale,
} from "@/graphql/types/graphql";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PostHogProvider } from "@/lib/PostHogProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: SiteLocale };
}>) {
  const data = await request(LayoutDocument, {});

  return (
    <html lang={locale as string}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <Header data={data.layout as LayoutRecord} />
          {children}
          <Footer data={data.layout as LayoutRecord} />
        </PostHogProvider>
      </body>
    </html>
  );
}
