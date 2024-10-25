import mongoose from "mongoose";

const projSchema = new mongoose.Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableSlots: {
      type: Number,
      required: true,
    },
    technology: {
      type: [String],
      required: true,
    },
    collegename: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

projSchema.index({ deadline: 1 }, { expireAfterSeconds: 0 });

const Proj = mongoose.model("Project", projSchema);
export default Proj;
