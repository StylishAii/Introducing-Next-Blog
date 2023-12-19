import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/server-helper";
import Channels from "@/models/Channels";

export const GET = async (req: NextRequest) => {
  await connect();
  const rs = req.nextUrl.searchParams.get("id");

  if(rs) {
    try {
      const channel = await Channels.findById(rs);

      if(!channel) {
        return NextResponse.json({ error: "Channel not found" }, { status: 404 });
      }

      return NextResponse.json(channel, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  } else {
      try {
        const channels = mergeSort(await Channels.find({}));
    
        return NextResponse.json(channels, { status: 200 });
      } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    }

};

const mergeSort = function(arr:  any[]) {
  if(arr.length <= 1) return arr; //base case
  let middle = Math.floor(arr.length / 2);
  let leftArray  = arr.slice(0, middle);
  let rightArray = arr.slice(middle);

  mergeSort(leftArray);
  mergeSort(rightArray);
  merge(leftArray, rightArray, arr);
  return arr;
}

const merge = function(leftArray:any[], rightArray: any[], array: any[]) {
  let i = 0, l = 0, r = 0;

  while(l < leftArray.length && r < rightArray.length) {
      if(leftArray[l].createdAt > rightArray[r].createdAt){
          array[i++] = leftArray[l++];
      } else {
          array[i++] = rightArray[r++];
      }
  }

  while(l < leftArray.length){
      array[i++] = leftArray[l++];
  }

  while(r < rightArray.length) {
      array[i++] =  rightArray[r++];
  }
}
