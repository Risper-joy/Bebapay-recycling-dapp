import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers" // Import your client-side wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beba Pay - Recycle and Earn",
  description: "Scan barcodes on recyclable items, earn Cypherium currency, and convert to M-Pesa cash.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
