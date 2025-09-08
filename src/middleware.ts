import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isPublic = path ==='/login'|| path==='/signup'

  const token = request.cookies.get("token")||""

  if(isPublic && token){
    return NextResponse.redirect(new URL('/profile',request.nextUrl));
  }
  if(!isPublic && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl));
  }
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    
  ]
}