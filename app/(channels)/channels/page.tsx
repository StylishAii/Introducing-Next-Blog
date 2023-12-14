"use client"
import React, { useEffect } from 'react'
import {Input} from "@nextui-org/react";
import { SearchIcon } from 'lucide-react';
import Channels from '@/models/Channels';
import connect from '@/utils/server-helper';

async function getChannels() {
    await connect();
    const res = await Channels.find({});
    console.log(res)
}

function ChannelsPage() {
    useEffect(()=>{
        getChannels()
    },[])
  return (
    <main className='pt-10 w-4/5 min-h-screen'>
        <div className='flex justify-between sticky'>
            <h1 className='text-[20px] font-bold '>Browse all channels</h1>
            <Input
                label="Search"
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
                base:"w-1/4"
                }}
                placeholder="Type to search..."
                startContent={
                <SearchIcon width={20} className="pt-2 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />
        </div>
        <div className='flex flex-col mt-20'>
            
        </div>
    </main>
  )
}

export default ChannelsPage