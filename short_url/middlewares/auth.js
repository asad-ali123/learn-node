import { getUser } from "../service/auth.js";

export async function restrictToLoggedInUserOnly(req, res, next) {
  const userUId = req.cookies.uid;
//   if (!userUId) return res.redirect("/login");

  const user = getUser(userUId);
  console.log(user);

  if (!user) return res.redirect("/");
  req.user = user;
  next();
  
}
