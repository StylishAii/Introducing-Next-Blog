import type { Metadata } from "next";
import { GeistSans } from 'geist/font';
import {Providers} from "@/components/Providers";
import NextUIProv from "@/components/NextUIProv";
import "./globals.css";

const geist = GeistSans;

export const metadata: Metadata = {
  title: "ChatWithMe",
  description: "A next-gen chat app for friends",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en">
      <body className={geist.className}>
        <NextUIProv>
          {children}
        </NextUIProv>
      </body>
    </html>
  );
}
