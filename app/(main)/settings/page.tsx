"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { montserrat } from "@/fonts";
import { Moon, Sun } from "lucide-react";

function Settings() {
  const { setTheme } = useTheme();
  const theme = localStorage.getItem("theme");
  useEffect(() => {}, [theme]);
  return (
    <main
      className={`dark:bg-[#191c1c] bg-[#e3e2e2] flex min-h-screen flex-col  px-10 pt-20 ${montserrat.className} `}
    >
      <h1 className="text-2xl font-extrabold tracking-wide mx-auto">
        Settings
      </h1>
      <section className=" mt-10 flex justify-between md:justify-evenly">
        <section className="mt-20 flex flex-col space-y-4">
          <h2 className="text-xl font-bold">Light Mode</h2>
        </section>
        <section className="mt-20 flex flex-col space-y-4">
          <Switch
            isSelected={theme === "light" ? true : false}
            onClick={
              theme === "light"
                ? () => setTheme("dark")
                : () => setTheme("light")
            }
            color="primary"
            thumbIcon={({ isSelected, className }) =>
              !isSelected ? (
                <Moon
                  size={15}
                  strokeWidth={3}
                  className={`${className} text-black`}
                />
              ) : (
                <Sun
                  size={15}
                  strokeWidth={3}
                  className={`${className} text-black`}
                />
              )
            }
          />
        </section>
      </section>
    </main>
  );
}

export default Settings;
