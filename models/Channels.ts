import mongoose, { Schema } from "mongoose";

const ChannelSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true, _id:false }
);

export default mongoose.models.Channel ||
  mongoose.model("Channel", ChannelSchema);
