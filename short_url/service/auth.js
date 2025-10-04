// use for JWT authentication

import JWT from "jsonwebtoken";
const secret = "asad@1234";

const setUser = (user) => {
  return JWT.sign(
    {
      _id: user?._id,
      email: user?.email,
      role: user?.role,
    },
    secret
  );
};

const getUser = (token) => {
  return JWT.verify(token, secret);
};

export { setUser, getUser };

// use for statefull authentication
// const sessionIdToUserMap = new Map();

// export function setUser(id, user) {
//   console.log("SET USER:", id, user);
//   return sessionIdToUserMap.set(id, user);
// }

// export function getUser(id) {
//   console.log("GET USER:", id, sessionIdToUserMap);
//   return sessionIdToUserMap.get(id);
// }
