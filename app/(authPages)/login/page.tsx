"use client"
import React, { useEffect } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
// import TsParticles from "@/components/TsParticles";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useSession, signIn } from "next-auth/react";


export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [warning, setWarning] = React.useState("")
  const router = useRouter();
  const session = useSession();
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(()=>{
    if(session?.status === "authenticated") {
      router.replace('/')
    }
  },[session,router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    return emailRegex.test(email);
  };

  const notify = () => toast.error(warning, {
      // configuring react toastify notifications
      icon: !warning.includes("successfully") ? <AlertCircle className="text-yellow-400"/> : <CheckCircle className="text-green-600" /> ,
      style: {
        borderRadius: "20px",
        backgroundColor: "#333",
        color: "#fff",
    },
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
      setWarning("Invalid email or password")
      notify();
      if(res?.url) {
        router.replace("/")
      }
    }
  }
  return (
    <div className="flex flex-col md:items-center pt-20 px-10 md:px-0 w-full md:w-[400px]">
      {/* <TsParticles/> */}
      <div className="md:w-[600px] md:p-20 md:rounded-md md:backdrop-blur-md md:bg-white/10">
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
            className=""
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
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

