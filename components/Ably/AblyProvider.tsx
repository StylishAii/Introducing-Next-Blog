"use client"

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { useSession } from 'next-auth/react';


export default function AblyClientProvider({ children}: { children: React.ReactNode,}) {
  const {data:session} = useSession();
const client = new Ably.Realtime.Promise({ authUrl: '/api/token', authMethod:"POST", authHeaders:{clientId:session?.user?.email!}})

  return (
    <AblyProvider client={client}>
      {children}
    </AblyProvider>
  )
}