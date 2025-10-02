import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";
export async function handleGetAllUser(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}
export async function handleUserSignup(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res
      .status(400)
      .json({ error: "First name, email, and password are required." });
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  // return res.json({ user: newUser });
  return res.redirect("/");
}

export async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid email and password" });
  // const sessionId = uuidv4();
  // setUser(sessionId, user);

  const token = setUser(user);

  // res.cookie("uid", token);
  // res.json({ token: token });
  return res.json({ token: token });
}
