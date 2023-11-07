"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex">
        <Button onClick={()=>signOut()} color="default">Log out</Button>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <Button onClick={()=>signIn()} color="default">Log in</Button>
      </div>
    );
  }
}

const Navbar = () => {
  return (
    <>
      <nav className="flex w-full justify-evenly">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">ChatWithMe</h1>
        </Link>
        <AuthButton />
      </nav>
    </>
  );
};

export default Navbar;
