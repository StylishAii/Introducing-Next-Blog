import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/server-helper";
import Channels from "@/models/Channels";

export const GET = async () => {
  await connect();

  try {
    const channels = await Channels.find({});
    return NextResponse.json(channels, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
