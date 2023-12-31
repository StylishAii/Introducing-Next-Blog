import ActivateToken from "@/models/ActivateToken";
import Users from "@/models/Users";
import connect from "@/utils/server-helper";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}:{params:{token:string}}) => {
    const {token} = params;
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id")
    await connect();

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const user = await Users
    .findOne({
        _id: id,
        activateToken: { $exists: true },
        activatedAt: null,
        createdAt: { $gt: twentyFourHoursAgo }
    })
    .populate("activateToken").exec();

    if(!user) {
        throw new Error("Invalid token")
    }

    const res = await Users.updateOne({ _id: user._id }, {activated:true});

    await ActivateToken.updateOne({token:token}, {activatedAt: new Date()})

    return NextResponse.redirect(process.env.NEXTAUTH_URL+"/login")
}