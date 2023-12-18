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
  return (
    <div>
        <h1>{params._id}</h1>
    </div>
  )
}

export default ChannelView