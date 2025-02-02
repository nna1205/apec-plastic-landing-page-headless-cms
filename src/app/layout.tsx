import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { request } from "@/lib/datocms";
import { LayoutDocument, LayoutRecord } from "@/graphql/types/graphql";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PostHogProvider } from "@/lib/PostHogProviders";
import { I18nProvider } from "@/i18n/provider";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await request(LayoutDocument, {});

  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <I18nProvider>
            <Header data={data.layout as LayoutRecord} />
            {children}
            <Footer data={data.layout as LayoutRecord} />
          </I18nProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
