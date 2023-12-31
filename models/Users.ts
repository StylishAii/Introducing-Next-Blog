import mongoose from "mongoose";
import { IActivateToken } from "./ActivateToken";

const {Schema} = mongoose;

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password?: string,
    activated?: boolean,
    activateToken: IActivateToken
}


const UserSchema = new Schema<IUser>(
    {
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type:String,
            required: false
        },
        activated:{
            type:Boolean,
            default: false
        },
        activateToken:{
            type: Schema.Types.ObjectId,
            ref: "ActivateToken",
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);