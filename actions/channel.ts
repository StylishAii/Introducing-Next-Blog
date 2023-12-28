"use server";

import Channels from "@/models/Channels";
import connect from "@/utils/server-helper";

/**
 * 
 * create a channel
 */
type TChannel ={
    chnl_id: string,
    chnl_name: string,
    chnl_desc: string,
    category: string,
};

export async function create(email:string | null | undefined,formData: FormData) {
    await connect();
    const {category,chnl_desc,chnl_id,chnl_name} = Object.fromEntries(formData.entries()) as TChannel;
    
    
    if(!chnl_id || !chnl_name || !chnl_desc || !category|| !email) {
        return { error: 'Invalid Data' }
    }

    const existing_channel = await Channels.findOne({chnl_id});
    if(existing_channel) { //if there is an existing channel with the same _id
        return { error: 'Channel is already created' } //throw a Next.js Response with an error
    }

    const newChannel = new Channels({
        chnl_id: chnl_id,
        createdBy: email,
        chnl_name: chnl_name,
        chnl_desc: chnl_desc,
        category: category,
    })

    try {
        await newChannel.save();
        return { message: "Channel is created" }
        
    } catch (error) {
        console.log(error)

        return { message: "Server error" }

    }
}
