"use client"
import React from 'react'
import { useParams } from 'next/navigation'

interface PageProps {
    _id: string;
    chnl_id: string;
    chnl_name: string;
    chnl_desc: string;
    category: string;
    createdAt: Date;
    createdBy: string;

}

function ChannelView({params}:{params: PageProps}) {
  const {_id,category,chnl_desc,chnl_id,chnl_name,createdAt,createdBy} = params;
  return (
    <div>
        <h1 className='text-white text-2xl'>{_id}</h1>
    </div>
  )
}

export default ChannelView