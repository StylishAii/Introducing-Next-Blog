"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./Providers";

function NextUIProv({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <NextUIProvider>{children}</NextUIProvider>
    </Providers>
  );
}

export default NextUIProv;
