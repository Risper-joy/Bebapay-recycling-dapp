"use client";

import { SessionProvider } from "next-auth/react";
import { WalletProvider } from "@/lib/wallet-context"; // adjust path if needed
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </SessionProvider>
  );
}
export default Providers;