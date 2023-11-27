import mongoose, { Schema } from "mongoose";


const SessionSchema = new Schema({
    email: {type: String},
    createdAt: {type: Date, required: true},
    expires: {type: Date},
    accessToken: {type: String},
});

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
