"use client"

import { Dialog } from "@headlessui/react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Chrome } from "lucide-react" // Import icons

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-2xl font-bold text-green-700 mb-4">Login to Beba Pay</Dialog.Title>
          <p className="text-gray-600 mb-6 text-sm">Choose a method to log in</p>

          <div className="space-y-3">
            <Button
              className="w-full bg-green-600 hover:bg-green-300 text-white flex items-center gap-2 justify-center"
              onClick={() => signIn("google")}
            >
              <Chrome className="h-5 w-5" /> Continue with Google
            </Button>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 justify-center"
              onClick={() => signIn("email")}
            >
              <Mail className="h-5 w-5" /> Continue with Email
            </Button>
          </div>

          <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:text-green-700">
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
