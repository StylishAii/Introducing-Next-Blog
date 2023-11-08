import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import SessionProvider from "@/components/AuthProvider";
import NextUIProv from "@/components/NextUIProv";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={geist.className}>
        <NextUIProv>
          <SessionProvider session={session}>
            <Navbar/>
            {children}
          </SessionProvider>
        </NextUIProv>
      </body>
    </html>
  );
}
