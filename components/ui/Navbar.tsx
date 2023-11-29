"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import DarkLogo from '@/public/darkLogo.svg'
import LightLogo from '@/public/lightLogo.svg'
import Image  from "next/image"
import Link from "next/link";
import UserDropMenu from "./UserDropMenu";

export function AuthButton() {
  
  return (
    <div className="flex">
        <Link href={'/login'}><Button color="default">Log in</Button></Link>
      </div>
    );
}
  
  const Navbar = () => {
    const { data: session } = useSession();
    const {theme} = useTheme();
    
    return (
      <>
        <nav className="dark:bg-black p-3 flex items-center  w-full justify-between sm:px-[100px] min-md:px-[300px] max-md:[400px]">
          <Link href={"/"}>
            {
              theme === "dark" ? <Image className="hover:opacity-60 duration-100" width={170} src={LightLogo} alt={"light_logo"} /> : <Image className="hover:opacity-60 duration-100" width={170}  src={DarkLogo} alt={"dark_logo"}  />
            }
          </Link>
          {!session ? <AuthButton /> : <UserDropMenu/> }
          
        </nav>
      </>
    );
  };

export default Navbar;
