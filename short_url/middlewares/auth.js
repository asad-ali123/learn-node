import { getUser } from "../service/auth.js";
function checkForAuthentication(req, res, next) {
  // const authHeader = req.headers["authorization"]; // if use header auth
  const authCookie = req.cookies?.token; //  if use cookies
  req.user = null;
  // if (!authHeader || !authHeader.startsWith("Bearer")) return next(); // if use header auth
  if (!authCookie) return next(); // if use cookies

  const token = authCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}
export { checkForAuthentication, restrictTo };

// export async function restrictToLoggedInUserOnly(req, res, next) {
//   // const userUId = req.cookies.uid; validate from cookies
//   const authHeader = req.headers["authorization"]; // "Bearer <token>"
//   const token = authHeader && authHeader.split("Bearer ")[1];

//   console.log("token:", token);
//   if (!token) return res.redirect("/login"); //this use for auth

//   const user = getUser(token);
//   console.log(user);

//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }
