const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return await mongoose.connect(url).then(() => console.log("mongo Connected"));
}

module.exports = { connectMongoDB };
