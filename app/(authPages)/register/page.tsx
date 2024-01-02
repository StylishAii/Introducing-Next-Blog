"use client";
import Image from "next/image";
import Logo from '@/public/darkLogo.svg'  
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import {AlertCircle, CheckCircle } from "lucide-react";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [warning, setWarning] = React.useState<null | string>(null);
  const router = useRouter();
  const {status} = useSession();
  
  if(status === "authenticated"){
    redirect("/")
  }

  const notify = () =>
    toast.error(warning, {
      // configuring react toastify notifications
      icon: !warning?.includes("successfully") ? <AlertCircle className="text-yellow-400"/> : <CheckCircle className="text-green-600" /> ,
      style: {
        borderRadius: "20px",
        backgroundColor: "#333",
        color: "#fff",
      },
    });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    
    if(res.ok) {
      const {message, redirectURL} = await res.json();
      toast.success(`${message}`,{
        icon: <CheckCircle className="text-green-600"/>,
        duration:2700,
        style: {
          borderRadius: "20px",
          backgroundColor: "#333",
          color: "#fff",
        },
      });
      setTimeout(()=>{
        router.push(redirectURL) // after receiving `URL`, redirect the user to the according path 
      },2800)
    } else {
      const {message} = await res.json();
      toast.error(`${message}`, {
        icon: <AlertCircle className="text-red-600" />,
        duration:2700,
        style: {
          borderRadius: "20px",
          backgroundColor: "#fff",
          color: "#222"
        },
      })
    }

  }
  return (
    <div className="flex flex-col md:items-center pt-20 px-10 md:px-0 w-full md:w-[400px]">
      <div className="md:w-[600px] md:p-20 md:rounded-md md:backdrop-blur-md md:bg-white/10">
        <Image className="mx-auto" src={Logo} alt="logo" width={270}/>
        <h2 className="text-center text-[30px] font-semibold mb-6">Register</h2>
        <form className="flex flex-col space-y-7 " onSubmit={handleSubmit}>
          <Input
            isRequired
            size="lg"
            classNames={{
              inputWrapper: "dark:bg-black dark:text-white bg-white text-black  border-white/80",
              label: "dark:text-white/70 text-black",
            }}
            type="text"
            name="name"
            variant={"faded"}
            label="Username"
          />
          <Input
            isRequired
            size="lg"
            classNames={{
              inputWrapper: "dark:bg-black dark:text-white bg-white text-black  border-white/80",
              label: "dark:text-white/70 text-black",
            }}
            type="email"
            name="email"
            variant={"faded"}
            label="Email"
          />

          <Input
            isRequired
            size="lg"
            classNames={{
              inputWrapper: "dark:bg-black dark:text-white bg-white text-black  border-white/80",
              label: "dark:text-white/70 text-black",
            }}
            className=""
            type={isVisible ? "text" : "password"}
            name="password"
            minLength={8}
            variant={"faded"}
            label="Password"
          />
          <Button
            type="submit"
            variant="solid"
            className="text-lg font-semibold"
          >
            Register
          </Button>
        </form>

        <div className="my-10 flex justify-center">
          <Link href={"/login"}>Log in with an existing account</Link>
        </div>
        <div className="flex justify-between gap-x-3">
          <Button onClick={()=>signIn("google",{callbackUrl:"/"})} className="py-5" fullWidth variant="solid" ><FaGoogle className="w-6 h-10"/></Button>
          <Button onClick={()=>signIn("github",{callbackUrl:"/" })} className="py-5" fullWidth variant="solid"> <FaGithub className="w-6 h-6"/></Button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Register;
