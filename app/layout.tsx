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

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
  modal: React.ReactNode;
};

export default async function RootLayout({
  children,
  params: { locale },
  modal,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(inter.className, "h-full bg-background")}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-full flex-col">
            <Header />
            <div className="m-auto w-full">{children}</div>
          </div>
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
