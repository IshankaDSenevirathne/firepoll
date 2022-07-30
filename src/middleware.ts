// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { nanoid } from 'nanoid';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    if(request.cookies.get('poll-token')){
        console.log("Cookie : ",request.cookies.get('poll-token'))
        return;
    } 
    const token = nanoid();
    const res = NextResponse.next();
    res.cookies.set("poll-token",token,{sameSite:"strict"});
    return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}