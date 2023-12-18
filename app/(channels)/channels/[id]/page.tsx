import ChannelView from "@/components/client/ChannelView";
import { TChannel } from "@/components/client/ChannelsView";
import { FC } from "react";

export function generateMetadata({params}: {params: PageProps}) {
    return {
        title: `${params.params.chnl_name}`
    }
}
interface PageProps {
    params:{
        _id: string;
        chnl_id: string;
        chnl_name: string;
        chnl_desc: string;
        category: string;
        createdAt: Date;
        createdBy: string;
      
    }
}

export async function generateStaticParams() {
  const res = await fetch("/api/channels");
  const data: TChannel[] = await res.json();
  return data.map((channel) => ({
    chnl_id: channel.chnl_id,
    chnl_name: channel.chnl_name,
    chnl_desc: channel.chnl_desc,
    category: channel.category,
    createdAt: channel.createdAt,
    createdBy: channel.createdBy,
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
