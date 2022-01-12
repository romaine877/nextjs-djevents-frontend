import {NextResponse} from "next/server"


export async function middleware(req) {
  
  const cookie = req.cookies.token;

  

  if(cookie){
    return NextResponse.next()
  }else{
      return NextResponse.redirect('/account/login');
  }

  
  
}