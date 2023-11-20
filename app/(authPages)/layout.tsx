import type { Metadata } from "next";
import { GeistSans } from "geist/font";
// import SessionProvider from "@/components/AuthProvider";
// import NextUIProv from "@/components/NextUIProv";
// import Navbar from "@/components/ui/Navbar";
import "../globals.css"

const geist = GeistSans;

export const metadata: Metadata = {
  title: "Log in - ChatWithMe",
  description: "A next-gen chat app for friends",
};

export default  function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={geist.className}>
       <section className='min-h-screen bg-white/10 flex items-center justify-center '>
            {children}
       </section>
      </body>
    </html>
  );
}
