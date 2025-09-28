import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestemp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { timestamps: true }
);

export default mongoose.model("URL", urlSchema);
