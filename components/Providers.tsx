
import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { getServerSession } from "next-auth";
export default SessionProvider

export async function Providers ({children}: { children: React.ReactNode }) {
    const session = await getServerSession()
    return(
        <SessionProvider session={session}>
            <Navbar/>
            {children}
        </SessionProvider>
    )
}