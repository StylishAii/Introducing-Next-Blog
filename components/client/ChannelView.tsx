"use client"
import React, { useEffect, useState } from 'react'
import { TChannel } from './ChannelsView';

interface PageProps {
   id: string
}

function ChannelView({params}:{params: PageProps}) {
  const [channelinfo, setChannelInfo] = useState<TChannel | null>(null)
  const {id} = params;
  useEffect(()=>{
    const getChannel = async() =>{
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/channels?id=${id}`,{cache:"no-cache"});
      const data:TChannel = await res.json();
      setChannelInfo(data)
      console.log(data)
    }
    
    getChannel();
  },[id])

  return (
    <div>
        <h1 className='text-white text-2xl'>{channelinfo?.chnl_name}</h1>
    </div>
  )
}

export default ChannelView