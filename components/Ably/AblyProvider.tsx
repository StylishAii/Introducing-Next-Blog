"use client"

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { useSession } from 'next-auth/react';

// const tokenCache = new Map();

export default function AblyClientProvider({ children}: { children: React.ReactNode,}) {
 /** Including clientId in AblyProvider while doing a token request causes a request loop.
  * To prevent this action only use clientId in necessary situations, e.g. Entering a chat
  * or this example ->  https://github.com/ably-labs/ably-nextjs-fundamentals-kit/blob/70c085a0f31f4ae1030d5f118b09b114afdf6ce9/app/authentication/authentication-client.tsx
  * 
  *  const {data:session} = useSession();
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
*/

const client = new Ably.Realtime.Promise({ authUrl: '/api/token', authMethod:"POST"})

  return (
    <AblyProvider client={client}>
      {children}
    </AblyProvider>
  )
}