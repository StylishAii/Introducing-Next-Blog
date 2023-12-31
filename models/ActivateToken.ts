import mongoose from "mongoose";
import {IUser} from "@/models/Users"

const {Schema} = mongoose;

export interface IActivateToken {
    _id: string,
    token: string,
    activatedAt?:string,
    userId: IUser
}

const ActivateTokenSchema = new Schema<IActivateToken>(
    {
        token: {
            type: String,
            required: true,
        },
        activatedAt: {
            type: Date
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
{
    timestamps: true
})

export default mongoose.models.ActivateToken || mongoose.model<IActivateToken>("ActivateToken", ActivateTokenSchema)