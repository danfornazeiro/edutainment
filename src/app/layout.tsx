import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import Header from "@/components/common/header";
import Footer from "@/components/mobile/footer";
import ReactQueryProvider from "@/provider/react-query";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BrainCash",
  description: "Seu app de educação financeira",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
