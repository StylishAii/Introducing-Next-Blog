"use client"
import UserGreetings from "@/components/client/UserGreetings";
import { useSession } from "next-auth/react"

export default function Home() {
  const {data: session} = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='mt-10 flex flex-col'>
        {session ? (
          <UserGreetings/>
        ): (
          <h1>Please Log in</h1>
        )}
      </div>
    </main>
  )
}
