import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserInfoProvider from "./lib/hooks/useUserInfoContext";
import NextTopLoader from "nextjs-toploader";

const fontRemote = Noto_Sans({ subsets: ["latin"], weight: "400" });
const fontLocal = localFont({ src: "../public/ProductSans-Regular.ttf" });

export const metadata: Metadata = {
  title: "Spots",
  description: "Website layanan coworking space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={fontLocal.className}>
        <Toaster />
        <NextTopLoader showSpinner={false} />
        <UserInfoProvider>{children}</UserInfoProvider>
      </body>
    </html>
  );
}
