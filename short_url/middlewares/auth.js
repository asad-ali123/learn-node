import { getUser } from "../service/auth.js";

export async function restrictToLoggedInUserOnly(req, res, next) {
  const userUId = req.cookies.uid;
  if (!userUId) return res.redirect("/login"); //this use for auth

  const user = getUser(userUId);
  console.log(user);

  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
