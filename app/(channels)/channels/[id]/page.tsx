import ChannelView from "@/components/client/ChannelView";
import { TChannel } from "@/components/client/ChannelsView";
import { Metadata } from "next";
import { FC } from "react";

export async function generateMetadata({params}: {params: {id:number}}) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/channels?id=${params.id}`,{cache:"no-cache"});
  const data: TChannel = await res.json();
    return {
        title: `${data.chnl_name}`,
        description: `${data.chnl_desc}`,
        creator: `${data.createdBy}`,
        keywords: `${data.category}`,
    } as Metadata
}
interface PageProps {
    params:{
      id: string
    }
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/channels`,{cache:"no-cache"});
  const data: TChannel[] = await res.json();
  return data.map((channel) => ({
    id: channel._id
  }));
}

const Page: FC<PageProps> = ({params}) => {
  return (
    <main className="pt-10 w-4/5 min-h-screen">
      <section className="flex flex-col mt-15">
        <ChannelView params={params}/>
      </section>
    </main>
  );
};

export default Page;
