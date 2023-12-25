import Channels from "@/models/Channels";
import connect from "@/utils/server-helper";
import prisma from '@/prisma';
import { NextRequest, NextResponse } from "next/server";

type TChannel ={
    chnl_id: string,
    chnl_name: string,
    chnl_desc: string,
    category: string,
    created_by: string | null,
};

export const POST = async(req:NextRequest, res:NextResponse) => {

    try {
        const {category,chnl_desc,chnl_id,chnl_name, created_by} = req.body as unknown as TChannel;
    
        const existing_channel = await prisma.channel.findUnique({where:{chnl_id}});
        if(existing_channel) { //if there is an existing channel with the same email
            return NextResponse.json({message:"Channel is already created"}, {status:400}) //throw a Next.js Response with an error
        }
    
        if(!chnl_id || !chnl_name || !chnl_desc || !category ) {
            return NextResponse.json({message:"Invalid Data"}, {status:422})
        }
    
        
    
        await prisma.channel.create({
            data:{
                chnl_id:chnl_id,
                chnl_name:chnl_name,
                chnl_desc:chnl_desc,
                category:category,
                created_by:created_by
            }
        })
    
        return NextResponse.json({message:"Channel is created"},{status:200})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({message: "Server error"},{status:500})

    }

} 