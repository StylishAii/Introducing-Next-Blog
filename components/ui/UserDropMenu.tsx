"use client"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserDropMenu() {
    const {data: session} = useSession();
    const router = useRouter();

    function handleClick() {
      router.push('/settings')
    }
  return (
    <Dropdown className="bg-[#403f3f] dark:bg-[#2b2b2b]" placement="bottom-start">
        <DropdownTrigger>
          <Avatar
            classNames={{
                base:'bg-black border-black'
            }}
            as={'button'}
            isBordered
            alt={session?.user?.name ?? 'user'}
            src={session?.user?.image ?? 'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'}
            radius="full"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem textValue=" " key="profile" className="h-14 gap-2 text-white hover:underline hover:underline-offset-2 dark:hover:bg-[#312e81bf] dark:hover:underline dark:hover:underline-offset-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{session?.user?.name}</p>
          </DropdownItem>
          <DropdownItem textValue="My Settings" onClick={handleClick} key="settings" className="text-white hover:underline hover:underline-offset-2 dark:hover:underline dark:hover:underline-offset-2 dark:hover:bg-[#312e81bf]">
            My Settings
          </DropdownItem>
          <DropdownItem textValue="Help & Feedback" key="help_and_feedback" className="text-white hover:underline hover:underline-offset-2 dark:hover:bg-[#312e81bf] dark:hover:underline dark:hover:underline-offset-2">
            Help & Feedback
          </DropdownItem>
          <DropdownItem textValue="Log Out" onClick={()=>signOut()} key="logout" color="danger" className="text-red-400 hover:underline hover:underline-offset-2 dark:hover:underline dark:hover:underline-offset-2">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}

export default UserDropMenu