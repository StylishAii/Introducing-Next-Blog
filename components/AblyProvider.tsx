"use client"

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';


export default function AblyClientProvider({ children}: { children: React.ReactNode,}) {
const client = new Ably.Realtime.Promise({ authUrl: '/api/token'})

  return (
    <AblyProvider client={client}>
      {children}
    </AblyProvider>
  )
}