"use client"
import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import Logo from '@/public/darkLogo.svg'  
import Image from "next/image";
  
export default function Login() {
  const [warning, setWarning] = React.useState<null | string>(null)
  const router = useRouter();
  const session = useSession();
  

  if(session?.status === "authenticated") {
    redirect("/")
  }
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    return emailRegex.test(email);
  };
  
  const notify = () => toast.error(warning, {
    // configuring react toastify notifications
    icon: !warning?.includes("successfully") ? <AlertCircle className="text-yellow-400"/> : <CheckCircle className="text-green-600" /> ,
    style: {
      borderRadius: "20px",
      backgroundColor: "#333",
      color: "#fff",
    },
    duration:3400
  });
  
  async function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    if (!isValidEmail(email)) {
      setWarning("Email is invalid");
      notify();
      return;
    }
    
    if (!password || password.length < 8) {
      setWarning("Password is invalid");
      notify();
      return;
    }
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })
    
    if(res?.error) {
      console.log(res)
      setWarning(res.error)
      notify();
      if(res?.url) {
        router.replace("/")
      }
    }
  }
  return (
    <div className="flex flex-col md:items-center pt-0 px-10 md:px-0 w-full md:w-[400px]">
      <div className="md:w-[600px] md:p-20 md:rounded-md md:backdrop-blur-md md:bg-white/10">
        <Image className="mx-auto" src={Logo} alt="logo" width={270}/>
        <h2 className="text-center text-[30px] font-semibold mb-6">Welcome back!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-7 ">
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
            type={"password"}
            name="email"
            variant={"faded"}
            label="Password"
          />
          <Button type="submit" variant="solid" className="text-lg font-semibold">Log in</Button>
        </form>
        <div className="my-10 flex justify-center">
          <Link href={'/register'}>Don&apos;t have an account?</Link>
        </div>
        <div className="flex justify-between gap-x-3">
          <Button onClick={()=>signIn("google",{callbackUrl:"/"})}  className="py-5" fullWidth variant="solid" ><FaGoogle className="w-6 h-10"/></Button>
          <Button onClick={()=>signIn("github",{callbackUrl:"/"})}  className="py-5" fullWidth variant="solid"> <FaGithub className="w-6 h-6"/></Button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

