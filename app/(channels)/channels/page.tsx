"use client";
import React, { Suspense, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import Loading from "./loading";
import ChannelsView from "@/components/client/ChannelsView";
import { TChannel } from "@/components/client/ChannelsView";
  
function ChannelsPage() {
  const [channels, setChannels] = React.useState<TChannel[]>([]);
  useEffect(() => {
    async function getChannels() {
      try {
        const res = await fetch("/api/channels");
        const data = await res.json();
        setChannels(data);
      } catch (error) {
        console.log(error);
      }
    }

    getChannels();
  }, []);
  return (
    <main className="pt-10 w-4/5 min-h-screen">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row  sm:justify-between sticky">
        <h1 className="text-[20px] font-bold ">Browse all channels</h1>
        <Input
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
            base: "sm:w-1/4 w-2/4",
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon
              width={20}
              className=" text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
            />
          }
        />
      </div>
      <div className="flex flex-col mt-20">
          <Suspense fallback={<Loading />}>
            <ChannelsView channels={channels} />
          </Suspense>
      </div>
    </main>
  );
}

export default ChannelsPage;
