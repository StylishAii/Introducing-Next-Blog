import mongoose, { Schema } from "mongoose";

const ChannelSchema = new Schema(
  {
    chnl_id: { type: String, required: true },
    createdBy: { type: String, required: true },
    chnl_name: { type: String, required: true },
    chnl_desc: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Channel ||
  mongoose.model("Channel", ChannelSchema);
