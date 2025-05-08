import Link from "next/link"
import { RecycleIcon } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg text-black">
        <RecycleIcon className="h-6 w-6 text-green-600" />
        <span>Beba Pay</span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link href="/scan" className="text-sm font-medium text-black hover:text-green-500 hover:underline underline-offset-4">
          Scan
        </Link>
        <Link href="/reward" className="text-sm font-medium text-black hover:text-green-500 hover:underline underline-offset-4">
          Rewards
        </Link>
        <Link href="/admin" className="text-sm font-medium text-black hover:text-green-500 hover:underline underline-offset-4">
          Admin
          </Link>
        <Link href="/reward">
                <Button className="bg-blue-600 hover:bg-green-700 text-white">Connect Wallet</Button>
              </Link>
      </nav>
      
      <div className="ml-auto md:hidden">
        <MobileMenu />
      </div>
    </header>
  )
}