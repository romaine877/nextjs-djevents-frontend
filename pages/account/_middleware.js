import {NextResponse} from "next/server"

export function middleware(req) {
    const cookie = req.cookies.token;
    const {pathname} = req.nextUrl
    
    if(!cookie && pathname.includes('/dashboard')){
        return NextResponse.redirect('/account/login');
    }
    if(cookie && pathname.includes('/account/login')){
        return NextResponse.redirect('/account/dashboard');
    }
return NextResponse.next();
}