import ActivateToken from "@/models/ActivateToken";
import Users from "@/models/Users";
import connect from "@/utils/server-helper";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}:{params:{token:string}}) => {
    const {token} = params;
    await connect();

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).getTime();

    const user = await Users
    .findOne({
        activateToken: { $exists: true },
        activatedAt: null,
        createdAt: { $gt: twentyFourHoursAgo }
    })
    .populate("activateToken")
    .exec();

    if(!user) {
        throw new Error("Invalid token")
    }

    await Users.updateOne({ _id: user._id }, { $set: { activated: true } });

    await ActivateToken.updateOne({token:token}, {$set:{activatedAt: new Date()}})

    return NextResponse.redirect(process.env.NEXTAUTH_URL+"/login")
}