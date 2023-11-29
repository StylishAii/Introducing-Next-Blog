"use client"
import { Input } from "@nextui-org/react";
import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { channel_categories } from "@/data/categories";

function CreateChannel() {
  return (
    <section className="flex flex-col md:justify-center md:items-center pt-20 px-10  w-full min-h-screen  ">
      <form className="space-y-10 md:w-[500px]">
        <Input
          isRequired
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
        <Autocomplete
        defaultItems={channel_categories}
        label="Category"
        labelPlacement="outside"
        placeholder="e.g. Technology"
        classNames={{
          base: 'h-[50px]'
        }}
        variant="faded"
        >
          {(category) => <AutocompleteItem key={category.label} value={category.value}>{category.label}</AutocompleteItem>}
        </Autocomplete>
      </form>
    </section>
  );
}

export default CreateChannel;
