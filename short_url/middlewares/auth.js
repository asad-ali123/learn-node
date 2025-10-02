import { getUser } from "../service/auth.js";

export async function restrictToLoggedInUserOnly(req, res, next) {
  // const userUId = req.cookies.uid; validate from cookies
  const authHeader = req.headers["authorization"]; // "Bearer <token>"
  const token = authHeader && authHeader.split("Bearer ")[1];

  console.log("token:", token);
  if (!token) return res.redirect("/login"); //this use for auth

  const user = getUser(token);
  console.log(user);

  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
