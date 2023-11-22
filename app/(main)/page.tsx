"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const {data: session} = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='mt-10 flex flex-col'>
        {session ? (
          <h1>Hello, <strong><u>{session.user?.name}</u></strong>. Feel yourself like at home {')'}</h1>
        ): (
          <h1>Please Log in</h1>
        )}
      </div>
    </main>
  )
}
