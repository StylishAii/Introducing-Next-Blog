import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import SessionProvider from "@/components/AuthProvider";
import NextUIProv from "@/components/NextUIProv";
import Navbar from "@/components/ui/Navbar";
import "../globals.css";
import { getServerSession } from "next-auth";
import NextThemesProvider from "@/components/NextThemesProvider";
import AblyClientProvider from "@/components/AblyProvider";



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
      {/* <AblyClientProvider> */}
        <NextUIProv>
          <NextThemesProvider attribute="class" defaultTheme="dark">
          <SessionProvider basePath="/api/auth" session={session}>
            <Navbar/>
            {children}
          </SessionProvider>
          </NextThemesProvider>
        </NextUIProv>
      {/* </AblyClientProvider> */}
      </body>
    </html>
  );
}
