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

export async function create(formData: FormData) {
    const { chnl_id, chnl_name, chnl_desc, category } = formData as unknown as TChannel;


    if(!chnl_id || !chnl_name || !chnl_desc || !category) {
        return { error: 'Invalid Data' }
    }

    await connect();
    const existing_channel = await Channels.findOne({chnl_id});
    if(existing_channel) { //if there is an existing channel with the same email
        return { error: 'Channel is already created' } //throw a Next.js Response with an error
    }

    const newChannel = new Channels({
        chnl_id,
        chnl_name,
        chnl_desc,
        category,
    })

    try {
        await newChannel.save();
        return { message: "Channel is created" }
        
    } catch (error) {
        console.log(error)

        return { message: "Server error" }

    }
}
