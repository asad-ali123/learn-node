import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestemp: { type: Number } }],
  },
  { timestemp: true }
);

export default URL = new mongoose.model("url", urlSchema);
