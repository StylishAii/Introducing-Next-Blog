import type { Metadata } from "next";
import { GeistSans } from "geist/font";
// import SessionProvider from "@/components/AuthProvider";
// import NextUIProv from "@/components/NextUIProv";
// import Navbar from "@/components/ui/Navbar";
import "../globals.css"
import SessionProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";

const geist = GeistSans;

export const metadata: Metadata = {
  title: "Log in - ChatWithMe",
  description: "A next-gen chat app for friends",
};

export default async  function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={geist.className}>
      <SessionProvider basePath="/api/auth" session={session}>
       <section className=' min-h-screen dark:bg-white/10 light:bg-[#d1d1d1] bg-[#eeecec] flex items-center justify-center '>
            {children}
       </section>
      </SessionProvider>
      </body>
    </html>
  );
}
