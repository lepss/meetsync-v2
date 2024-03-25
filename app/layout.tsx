import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meetsync",
  description: "Synchronize your meetings",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(inter.className, "h-full bg-background")}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-full flex-col">
            <Header />
            <div className="container m-auto w-full py-14">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
