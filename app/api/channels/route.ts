import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/server-helper";
import Channels from "@/models/Channels";

export const GET = async () => {
  await connect();

  try {
    const channels = mergeSort(await Channels.find({}));

    return NextResponse.json(channels, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const mergeSort = function(arr:  any[]) {
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
