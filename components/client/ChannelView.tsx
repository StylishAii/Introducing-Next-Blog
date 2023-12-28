"use client";
import React, { useEffect, useState } from "react";
import { TChannel } from "./ChannelsView";
import { MessagesSquare, Share2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  FacebookIcon,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon
} from "react-share";

interface PageProps {
  id: string;
}

function ChannelView({ params }: { params: PageProps }) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [channelinfo, setChannelInfo] = useState<TChannel | null>(null);
  const { id } = params;
  useEffect(() => {
    const getChannel = async () => {
      /**
       * no need to include 'NEXTAUTH_URL` env variable here as it is already a client component
       */
      const res = await fetch(`/api/channels?id=${id}`, { cache: "no-cache" });
      const data: TChannel = await res.json();
      setChannelInfo(data);
      console.log(data);
    };

    getChannel();
  }, [id]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="px-4 py-4 flex justify-between sticky backdrop-blur-md bg-gradient-to-b rounded-br-medium rounded-bl-medium fixed-position dark:from-black/80 from-white to-white/40 dark:to-white/30 w-full">
        <div className="flex flex-col">
          <div className="inline-flex text-center">
            <div className="p-2 bg-gray-800 rounded-full">
              <MessagesSquare />
            </div>
            <h1 className="ml-3 text-xl">{channelinfo?.chnl_name}</h1>
          </div>
          <div className="opacity-70 text-base ml-10">
            {channelinfo?.chnl_desc}
          </div>
        </div>
        <div>
          {/* A Social Share - Modal Component */}
          <Button isIconOnly radius="full" onPress={onOpen}>
            <Share2 size={20} />
          </Button>
          <Modal
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            radius="lg"
            classNames={{
              body: "py-6 px-2",
              backdrop: "bg-[#292f46]/60 backdrop-opacity-80",
              base: "border-[#292f46] border-2 bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
              header: "border-b-[1px] border-[#292f46]",
              footer: "border-t-[1px] border-[#292f46]",
              closeButton: "hover:bg-white/5 active:bg-white/10 bg-white/10",
            }}
          >
            <ModalContent>{(onClose)=>(
              <>
                <ModalHeader>Share it with your friends!</ModalHeader>
                <ModalBody  className="flex flex-row justify-around">
                  <FacebookShareButton hashtag="#chatapp #chatwme #trend #socialapp #follow" url={location.href}><FacebookIcon size={50} round={true}/></FacebookShareButton> 
                  <TwitterShareButton hashtags={['chatpp', "chatwme", "trend", "socialapp", "follow", `${channelinfo?.category}`]} url={location.href}><TwitterIcon size={50} round={true}/></TwitterShareButton>
                  <LinkedinShareButton summary={channelinfo?.chnl_desc} url={location.href}>
                    <LinkedinIcon round={true} size={50} />
                  </LinkedinShareButton>
                  <TelegramShareButton url={location.href} title={channelinfo?.chnl_name}><TelegramIcon size={50} round={true} /></TelegramShareButton>
                </ModalBody>
              </>
            )}</ModalContent>
          </Modal>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default ChannelView;
