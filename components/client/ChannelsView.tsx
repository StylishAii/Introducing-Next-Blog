import React from "react";
import { Chip, Badge } from "@nextui-org/react";
import { isNewChannel } from "@/lib/isNewChannel";
import Link from "next/link";

export type TChannel = {
  _id: string;
  chnl_id: string;
  createdBy: string;
  chnl_name: string;
  chnl_desc: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

function ChannelsView({ channels }: { channels: TChannel[] }) {
  
  return (
    <ul className="flex flex-col space-y-5 items-center pb-6 w-full">
      {channels.map((channels) => (
        <Link key={channels._id} href={`/channels/${channels._id}`}>
          <Badge  isInvisible={isNewChannel(`${channels.createdAt}`)} content="New" placement="top-left"  color="danger" size="sm">
            <li
              key={channels._id}
              className="pt-3 bg-gradient-to-br dark:from-[#2f2f2f] dark:via-red-200/10 dark:to-[#ffeffe]/30 flex flex-col space-y-4 min-w-[390px] md:w-[600px] py-2 px-5 rounded-lg border hover:drop-shadow-xl shadow-white transition hover:opacity-70 hover:scale-[0.995]  ease-in-out duration-300 border-[#ffbffb]/30"
            >
              <div className="flex space-y-4 flex-col w-full">
                <div className="flex justify-between flex-col w-full">
                  <div className="flex justify-between">
                    <h1 className="text-[18px] font-bold">
                      {channels.chnl_name}
                    </h1>
                    <Chip
                      variant="faded"
                      color="warning"
                      classNames={{
                        content: "text-[12px] sm:text-[15px]",
                      }}
                    >
                      {channels.category}
                    </Chip>
                  </div>
                  <span className="truncate mt-2 text-md sm:text-[18px] opacity-50 font-bol">
                    {channels.chnl_desc}
                  </span>
                </div>
                <div>
                  <p className="text-sm">
                    Created at: {new Date(channels.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            </li>
          </Badge>
        </Link>
      ))}
    </ul>
  );
}

export default ChannelsView;
