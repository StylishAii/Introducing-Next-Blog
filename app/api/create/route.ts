import Channels from "@/models/Channels";
import connect from "@/utils/server-helper";
import { NextRequest, NextResponse } from "next/server";

type TChannel ={
    chnl_id: string,
    chnl_name: string,
    chnl_desc: string,
    category: string,
};

export async function POST(req:NextRequest, res:NextResponse) {
    const formData = await req.formData();
    const { chnl_id, chnl_name, chnl_desc, category } = formData as unknown as TChannel;

    await connect();
    const existing_channel = await Channels.findOne({chnl_id});
    if(existing_channel) { //if there is an existing channel with the same email
        return new NextResponse("Channel is already created", {status:400}) //throw a Next.js Response with an error
    }

    if(!chnl_id || !chnl_name || !chnl_desc || !category) {
        return new NextResponse("Invalid Data", {status:422})
    }

    const newChannel = new Channels({
        chnl_id,
        chnl_name,
        chnl_desc,
        category,
    })

    try {
        await newChannel.save();
        return NextResponse.json("Channel is created",{status:200})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({message: "Server error"},{status:500})

    }

} 