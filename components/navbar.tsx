"use client";

import Link from "next/link";
import { RecycleIcon } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/wallet-context";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export function Navbar() {
  const { account, connect, disconnect } = useWallet();
  const { data: session } = useSession();

  return (
    <>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-black">
          <RecycleIcon className="h-6 w-6 text-green-600" />
          <span>Beba Pay</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
          <Link
            href="/scan"
            className="text-sm font-medium text-black hover:text-green-500 hover:underline underline-offset-4"
          >
            Scan
          </Link>
          <Link
            href="/reward"
            className="text-sm font-medium text-black hover:text-green-500 hover:underline underline-offset-4"
          >
            Rewards
          </Link>

          {/* Wallet */}
          <Button
            onClick={account ? disconnect : connect}
            className="bg-blue-600 hover:bg-green-700 text-white"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </Button>

          {/* Auth Buttons */}
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-black font-medium">
                {session.user?.name?.split(" ")[0] ?? "User"}
              </span>
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="text-sm text-black"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => signIn("google")}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Login
            </Button>
          )}
        </nav>

        {/* Mobile Nav */}
        <div className="ml-auto md:hidden">
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
