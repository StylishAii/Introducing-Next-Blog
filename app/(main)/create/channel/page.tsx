"use client";
import { Input, Button } from "@nextui-org/react";
import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { channel_categories } from "@/data/categories";
import { useFormStatus } from "react-dom";
import { createChannelID } from "@/lib/createChannelD";
import {create} from '@/actions/channel';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast,{ Toaster } from "react-hot-toast";
import { AlertCircle, CheckCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Create
    </Button>
  );
}

function CreateChannel() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = React.useState("");
  const [desc, setDescription] = React.useState("");
  const [id, setID] = React.useState("");
  const [selected, setSelected] = React.useState("");
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/create", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        chnl_id: id,
        chnl_name: name,
        chnl_desc: desc,
        category: selected,
        createdBy: session?.user?.email,
      }),
    });
    console.log(res)
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
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function onInputChange(value: string) {
    setSelected(value);
  }
  
  // const createwithEmail = create.bind(null, session?.user?.email)
  
  React.useEffect(() => {
    const id = createChannelID(name);
    setID(id);
  },[name]);
  return (
    <section className="flex flex-col  md:items-center pt-20 px-10  w-full min-h-screen  ">
      <h2 className="text-xl font-bold mb-14">Create a channel</h2>
      <form  className="space-y-10 md:w-[500px]" onSubmit={handleSubmit}>
        <Input
          value={id}
          isReadOnly={true}
          name="chnl_id"
          variant="faded"
          classNames={{
            inputWrapper:
              "h-[50px] dark:bg-neutral-800 dark:text-[#999] bg-neutral-200 text-[#888]",
            label: "dark:text-white/70 text-black",
          }}
          labelPlacement="inside"
          type="text"
          label="Channel ID"
          placeholder=""
        />
        <Input
          isRequired
          onChange={handleName}
          name="chnl_name"
          variant="faded"
          classNames={{
            inputWrapper:
              "h-[50px] dark:bg-neutral-800 dark:text-white bg-neutral-200 text-black",
            label: "dark:text-white/70 text-black",
          }}
          labelPlacement="outside"
          type="text"
          label="Channel name"
          placeholder="e.g. Welcomers"
        />
        <Input
          isRequired
          name="chnl_desc"
          variant="faded"
          onChange={handleDescription}
          classNames={{
            inputWrapper:
              "h-[50px] dark:bg-neutral-800 dark:text-white bg-neutral-200 text-black",
            label: "dark:text-white/70 text-black",
          }}
          labelPlacement="outside"
          type="text"
          label="Description"
          placeholder="e.g. Come and say hello!"
        />
        <Autocomplete
          name="category"
          isRequired
          defaultItems={channel_categories}
          label="Category"
          labelPlacement="outside"
          placeholder="e.g. Technology"
          classNames={{
            base: "h-[50px]",
          }}
          variant="faded"
          onInputChange={onInputChange}
        >
          {(category) => (
            <AutocompleteItem key={category.label} value={category.value}>
              {category.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <SubmitButton/>
      </form>
      <Toaster position="top-right" />
    </section>
  );
}

export default CreateChannel;
