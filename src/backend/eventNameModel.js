import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, { collection: 'names' });

const Names = mongoose.models.names || mongoose.model("names", nameSchema);

export default Names;