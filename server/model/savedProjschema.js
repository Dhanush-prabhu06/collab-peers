import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const Saved = mongoose.model("save", savedSchema);

export default Saved;
