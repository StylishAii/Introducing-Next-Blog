"use client"
import React, { useEffect, useState } from 'react'
import { TChannel } from './ChannelsView';
import { MessagesSquare } from 'lucide-react';
import {Snippet} from "@nextui-org/react";
import { useSelectedLayoutSegments } from 'next/navigation';


interface PageProps {
   id: string
}

function ChannelView({params}:{params: PageProps}) {
  const path = useSelectedLayoutSegments();
  const [channelinfo, setChannelInfo] = useState<TChannel | null>(null)
  const {id} = params;
  useEffect(()=>{
    const getChannel = async() =>{
      /**
       * no need to include 'NEXTAUTH_URL` env variable here as it is already a client component
       */
      const res = await fetch(`/api/channels?id=${id}`,{cache:"no-cache"});
      const data:TChannel = await res.json();
      setChannelInfo(data)
      console.log(data)
    }
    
    getChannel();
  },[id])

  return (
    <div className='w-full flex flex-col min-h-screen'>
      <div className='px-4 py-4 flex justify-between sticky backdrop-blur-md bg-gradient-to-b rounded-br-medium rounded-bl-medium fixed-position dark:from-black/80 from-white to-white/40 dark:to-white/30 w-full'>
        <div  className='flex flex-col'>
          <div className='inline-flex text-center'>
            <MessagesSquare />
            <h1 className='ml-3 text-xl'>{channelinfo?.chnl_name}</h1>
          </div>
          <div className='opacity-70 text-base ml-10'>{channelinfo?.chnl_desc}</div>

        </div>
        <div>
          <Snippet codeString={location.href} hideSymbol><p className='truncate'>Copy channel link</p></Snippet>
        </div>
      </div>
      <div className=''>

      </div>
    </div>
  )
}

export default ChannelView