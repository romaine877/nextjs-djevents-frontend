import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method != "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Only GET requests allowed" });
  } else {
    // check if cookie is set
    if (!req.headers.cookie) {
      res.status(401).json({ message: "Unauthenticated" });
    } else {
      const {token} = cookie.parse(req.headers.cookie);
       
      // request strapi api
      const strapiRes = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await strapiRes.json();
        if (strapiRes.ok) {
            res.status(200).json({ user: data });
            }
        else {
            res.status(403).json({ message: token });
        }
    }
  }
};
