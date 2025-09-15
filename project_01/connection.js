const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return await mongoose
    .connect(url)
    .then(() => console.log("mongoDB Connected"));
}

module.exports = { connectMongoDB };
