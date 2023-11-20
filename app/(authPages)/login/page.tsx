import TsParticles from "@/components/TsParticles";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

function Login() {
  return (
    <div className="flex flex-col md:items-center pt-20 px-10 md:px-0 w-full md:w-[400px]">
      {/* <TsParticles/> */}
      <div className="md:w-[600px] md:p-20 md:rounded-md md:backdrop-blur-md md:bg-white/10">
        <div className="flex flex-col space-y-7 ">
          <Input
            isRequired
            size="lg"
            classNames={{
              inputWrapper: "bg-black  border-white/80",
              label: "text-white/70",
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
              inputWrapper: "bg-black border-white/80 ",
              label: "text-white/70",
            }}
            className=""
            type="password"
            name="email"
            variant={"faded"}
            label="Password"
          />
          <Button variant="solid" className="text-lg font-semibold">Log in</Button>
        </div>
        <div className="mt-10 flex justify-center">
          <Link href={'/register'}>Don&apos;t have an account?</Link>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
