import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import "../globals.css";
import SessionProvider from "@/components/AuthProvider";
import NextUIProv from "@/components/NextUIProv";
import NextThemesProvider from "@/components/NextThemesProvider";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";

const geist = GeistSans;

export const metadata: Metadata = {
  title: {
    template: "%s | ChatWithMe",
    default:"Channels | ChatWithMe"
  },
  description: "A next-gen chat app for friends",
};

const DynamicAblyProvider = dynamic(
  () => import("@/components/Ably/AblyProvider"),
  {
    ssr: false,
  }
);

export default async function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={geist.className}>
        <SessionProvider basePath="/api/auth" session={session}>
          <DynamicAblyProvider>
            <NextUIProv>
              <NextThemesProvider attribute="class" defaultTheme="dark">
                <Navbar /> 
                <section className=" min-h-screen dark:bg-black bg-[#f0eded]  flex flex-col items-center">
                  {children}
                </section>
              </NextThemesProvider>
            </NextUIProv>
          </DynamicAblyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
