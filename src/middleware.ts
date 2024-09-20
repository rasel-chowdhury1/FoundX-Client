import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/AuthService';
 

const AuthRoutes = ["/login", "/register"];

type TRole = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
    USER: [/^\/profile/],
    ADMIN: [/^\/admin/],
  };

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

const {pathname} = request.nextUrl;
console.log("pathname -> ",pathname)

 

  const user = await getCurrentUser();

  if(!user){
    if(AuthRoutes.includes(pathname)){
        return NextResponse.next()
    }
    else{
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
    }
  }
  
  if(user?.role && roleBasedRoutes[user?.role as TRole]){
    const routes = roleBasedRoutes[user?.role as TRole];

    console.log("routers -> ",routes);

    if(routes.some((route) => pathname.match(route))){
        return NextResponse.next()
    }
  }
  
  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile","/profile/:page*", "/admin", "/login", "/register"],
}