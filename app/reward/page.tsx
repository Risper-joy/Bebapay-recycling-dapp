"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RecycleIcon, Coins, ArrowDownToLine, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MobileMenu } from "@/components/mobile-menu"

export default function RewardsPage() {
  const [convertAmount, setConvertAmount] = useState("")
  const [converted, setConverted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")

  // Placeholder transaction history (values omitted)
  const transactions = [
    { id: 1, date: "-", type: "-", amount: null, item: "-" },
    { id: 2, date: "-", type: "-", amount: null, item: "-" },
    { id: 3, date: "-", type: "-", amount: null, item: "-" },
    { id: 4, date: "-", type: "-", amount: null, item: "-" },
    { id: 5, date: "-", type: "-", amount: null, item: "-" },
  ]

  const handleConvert = () => {
    if (!convertAmount || !phoneNumber) return

    setConverted(true)

    setTimeout(() => {
      setConverted(false)
      setConvertAmount("")
      setPhoneNumber("")
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <RecycleIcon className="h-6 w-6 text-green-600" />
          <span>Beba Pay</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link href="/scan" className="text-sm font-medium hover:underline underline-offset-4">
            Scan
          </Link>
          <Link href="/reward" className="text-sm font-medium hover:underline underline-offset-4">
            Rewards
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
        </nav>
        <div className="ml-auto md:hidden">
          <MobileMenu />
        </div>
      </header>
      <main className="flex-1 container max-w-4xl mx-auto py-12 px-4">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-black" >Your Balance</CardTitle>
                <CardDescription className="text-black">Current Cypherium rewards balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Coins className="h-8 w-8 text-green-600" />
                  <span className="text-4xl font-bold">--</span>
                  <span className="text-gray-500">CYP</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/scan">
                  <Button variant="outline">Scan More Items</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Convert to M-Pesa</CardTitle>
                <CardDescription className="text-black">Exchange your Cypherium for M-Pesa cash</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {converted && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                      {convertAmount} CYP has been converted to M-Pesa. Check your phone!
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-black">Amount (CYP)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount to convert"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-black">M-Pesa Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleConvert}
                  disabled={!convertAmount || !phoneNumber || converted}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Convert to M-Pesa
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription className="text-black">Your recent recycling and conversion activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all" className="text-black">All</TabsTrigger>
                  <TabsTrigger value="scans" className="text-black">Scans</TabsTrigger>
                  <TabsTrigger value="conversions" className="text-black">Conversions</TabsTrigger>
                </TabsList>

                {["all", "scans", "conversions"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="space-y-4">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div className="text-black">Date</div>
                        <div className="text-black">Type</div>
                        <div className="text-black">Item</div>
                        <div className="text-right text-black">Amount</div>
                      </div>
                      {transactions
                        .filter((tx) => {
                          if (tab === "scans") return tx.type === "Scan"
                          if (tab === "conversions") return tx.type === "Convert"
                          return true
                        })
                        .map((tx) => (
                          <div key={tx.id} className="grid grid-cols-4 p-4 border-b last:border-0">
                            <div>{tx.date}</div>
                            <div>{tx.type}</div>
                            <div>{tx.item}</div>
                            <div className="text-right text-gray-400">--</div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">© 2025 Beba Pay. All rights reserved.</p>
      </footer>
    </div>
  )
}
