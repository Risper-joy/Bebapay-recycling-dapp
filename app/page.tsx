/*import required components*/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scan, Coins, ArrowRight } from "lucide-react"
import { Layout } from "@/components/layout"

/*function to define the home contents*/
export default function Home() {
  return (
    <Layout>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column (Text) */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
              Recycle and Earn with Beba Pay
            </h1>
            <p className="text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Scan barcodes on recyclable items, earn Cypherium currency, and convert to M-Pesa cash. Join our mission
              for a cleaner environment while earning rewards.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/scan">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="text-black border-black hover:text-green-700 hover:border-green-700">Learn More</Button>
              </Link>
            </div>
          </div>
  
          {/* Right Column (Image) */}
          <div className="flex justify-end lg:-mr-40">
  <img
    src="recycle2.jpeg?height=400&width=400"
    alt="Recycling illustration"
    className="rounded-lg object-cover max-w-full h-auto"
    width={600}
    height={600}
  />
</div>
</div>
</div>
    </section>
  
  
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Three simple steps to start earning rewards for recycling
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Scan className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">1. Scan Barcodes</h3>
              <p className="text-gray-500">Use our app to scan barcodes on recyclable items you collect</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Coins className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">2. Earn Cypherium</h3>
              <p className="text-gray-500">Get rewarded with Cypherium currency for each item recycled</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <ArrowRight className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">3. Convert to M-Pesa</h3>
              <p className="text-gray-500">Exchange your Cypherium rewards for M-Pesa cash anytime</p>
            </div>
          </div>
        </div>
      </section>
</Layout>
  )
}