"use client"
import dynamic from 'next/dynamic';

const DynamicAblyProvider = dynamic(()=> import('./AblyProvider'), {
    ssr:false
})

export default DynamicAblyProvider