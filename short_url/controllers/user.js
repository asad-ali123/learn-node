import User from "../models/user.js";

export default async function handleUserSignup(req, res) {
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
