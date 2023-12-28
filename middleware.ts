import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if(request.cookies.has("next-auth.session-token") || request.cookies.has("__Secure-next-auth.session-token")) { // if user logged in 
    return NextResponse.next();  // i can redirect to the protected page if i want

  } else { // if there is no user logged in
    return NextResponse.redirect(new URL('/', request.url)) // whenever I open a protected page, it will automatically redirect to the main page which is "/""
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/settings", "/channels/:path* ", "/create/:path*"],
}