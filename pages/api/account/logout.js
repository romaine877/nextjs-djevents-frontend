import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure : process.env.NODE_ENV !== 'development',
        maxAge: new Date(0),
        sameSite: 'strict',
        path: '/'
    }))

    res.status(200).json({message: "logout sucessfull"})
  } else {

    res.setHeader('Allow', ["GET"]);
    res.status(405).json({ message: "Only POST requests allowed" });
  }
};
