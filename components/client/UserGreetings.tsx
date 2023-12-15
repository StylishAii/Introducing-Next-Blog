"use client";
import { PiHandWavingBold } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { Button, Tooltip } from "@nextui-org/react";
import {FiPlus} from "react-icons/fi"
import { useRouter } from "next/navigation";
import Link from "next/link";

function UserGreetings() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <section className="flex flex-col items-center">
      <div className="flex space-x-2 items-center text-center mb-3">
        <h1>
          Hello{" "}
          <strong>
            <u>{session?.user?.name}</u>
          </strong>
        </h1>
        <PiHandWavingBold className="dark:text-white text-2xl" />
      </div>

      <p className="dark:bg-red-200 dark:text-red-600 bg-red-100 text-red-500 font-semibold p-1 px-2 text-center rounded-md">
        It seems like you haven{"'"}t subscribed to any channels yet. <Link href={'/channels'} className="underline underline-offset-2">Browse the channels</Link>
      </p>
      <Tooltip 
      showArrow
      placement="right"
      content="Create a channel"
      classNames={{
        base: [
          // arrow color
          "before:bg-neutral-400 dark:before:bg-white",
        ],
        content: [
          "py-2 px-4 shadow-xl",
          "text-black font-semibold bg-gradient-to-br from-white to-white/40",
        ],
      }}
    >
      <Button
      onClick={()=>router.push("/create/channel")}
      isIconOnly
      className="mt-10"
      radius="full"
      aria-label="Create a channel"
      size="lg">
        <FiPlus className="text-2xl" />
      </Button>
    </Tooltip>
      
    </section>
  );
}

export default UserGreetings;
