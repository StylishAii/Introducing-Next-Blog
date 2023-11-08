"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import UserDropMenu from "./UserDropMenu";

export function AuthButton() {
  
  return (
    <div className="flex">
        <Button onClick={()=>signIn()} color="default">Log in</Button>
      </div>
    );
  }
  
  const Navbar = () => {
    const { data: session } = useSession();
    
    return (
      <>
        <nav className="p-3 flex w-full justify-between md:justify-evenly">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">ChatWithMe</h1>
          </Link>
          {!session ? <AuthButton /> : <UserDropMenu/> }
          
        </nav>
      </>
    );
  };

export default Navbar;
