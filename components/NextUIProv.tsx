"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function NextUIProv({ children }: { children: React.ReactNode }) {
  const navigate = useRouter();
  return (
      <NextUIProvider navigate={navigate.push}>
        {children}
      </NextUIProvider>
  );
}

export default NextUIProv;
