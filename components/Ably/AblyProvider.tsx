"use client"

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { useSession } from 'next-auth/react';

const tokenCache = new Map();

export default function AblyClientProvider({ children}: { children: React.ReactNode,}) {
  const {data:session} = useSession();
  const clientId = session?.user?.email!;
  // Check if the token is already in the cache
  if (tokenCache.has(clientId)) {
    const client = new Ably.Realtime.Promise({ tokenDetails: tokenCache.get(clientId) });
    return (
      <AblyProvider client={client}>
        {children}
      </AblyProvider>
    );
  }

const client = new Ably.Realtime.Promise({ authUrl: '/api/token', authMethod:"POST", authHeaders:{clientId:session?.user?.email!}})

  return (
    <AblyProvider client={client}>
      {children}
    </AblyProvider>
  )
}