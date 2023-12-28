import Channels from "@/models/Channels";
import connect from "@/utils/server-helper";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type TChannel = {
  chnl_id: string;
  chnl_name: string;
  chnl_desc: string;
  category: string;
  createdBy: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  await connect();
  const { chnl_id, chnl_name, chnl_desc, category, createdBy } = await req.json() as unknown as TChannel;
  const existing_channel = await Channels.findOne({chnl_id: chnl_id});
  if (existing_channel) {
    //if there is an existing channel with the same Channel ID
    return NextResponse.json({ message: "Channel was already created" },{ status: 400 }); //throw a Next.js Response with an error
  }

  if (!chnl_id || !chnl_name || !chnl_desc || !category || !createdBy) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  const newChannel = new Channels({
    chnl_id,
    chnl_name,
    chnl_desc,
    category,
    createdBy,
  });

  try {
    await newChannel.save();
    return NextResponse.json(
      { message: "Channel is created", redirectURL: "/channels" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
