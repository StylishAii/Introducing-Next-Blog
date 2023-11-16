"use client"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserDropMenu() {
    const {data: session} = useSession();
    const router = useRouter();

    function handleClick() {
      router.push('settings')
    }
  return (
    <Dropdown className="bg-[#3a33a3]" placement="bottom-start">
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
          <DropdownItem key="profile" className="h-14 gap-2 text-white">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{session?.user?.name}</p>
          </DropdownItem>
          <DropdownItem onClick={handleClick} key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem onClick={()=>signOut()} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}

export default UserDropMenu