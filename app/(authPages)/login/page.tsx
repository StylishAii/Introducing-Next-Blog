import { Input, Button } from "@nextui-org/react";

function Login() {
  return (
    <section className="flex flex-col pt-20 w-full md:w-[400px]">
      <div className=" flex flex-col space-y-7">
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
          type="email"
          name="email"
          variant={"faded"}
          label="Password"
        />
        <Button variant="solid" className="text-lg font-semibold">Log in</Button>
      </div>
    </section>
  );
}

export default Login;
