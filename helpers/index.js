import cookie from 'cookie'

export function getCookie(req){
   const token = cookie.parse(req? req.headers.cookie || '' : '')

  
       return token
   
    
}