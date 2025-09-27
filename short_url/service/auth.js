const sessionIdToUserMap = new Map();

export function setUser(id, user) {
  console.log("SET USER:", id, user);
  return sessionIdToUserMap.set(id, user);
}

export function getUser(id) {
  console.log("GET USER:", id, sessionIdToUserMap);
  return sessionIdToUserMap.get(id);
}

