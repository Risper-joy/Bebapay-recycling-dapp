/*import required components*/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scan, Coins, ArrowRight } from "lucide-react"
import { Layout } from "@/components/layout"
import { SessionProvider } from "next-auth/react"

/*function to define the home contents*/
export default function Home() {
  return (
    <Layout>
  <section className="relative w-full h-screen bg-green-900 text-white font-sans overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0 z-0">
    <img
      src="/text.jpg.jpg"
      alt="Recycling hero"
      className="w-full h-full object-cover object-center"
    />
    {/* Green overlay for contrast */}
    <div className="absolute inset-0 bg-green-900 opacity-50 mix-blend-multiply"></div>
  </div>

  {/* Centered Content */}
  <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-12 lg:px-24 text-center">
    <div className="max-w-3xl space-y-6">
      <h1 className="!text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
        Recycle and Earn with Beba Pay
      </h1>
      <p className="text-lg md:text-xl text-white drop-shadow-md">
        Scan barcodes on recyclable items, earn Cypherium currency, and
        convert to M-Pesa cash. Join our mission for a cleaner environment
        while earning rewards.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/scan">
          <Button className="bg-green-800 text-white hover:bg-white hover:text-green-700  px-6 py-3 text-lg font-semibold">
            Get Started
          </Button>
        </Link>
        <Link href="#about">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-green-700 px-6 py-3 text-lg font-semibold"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>


<section id="about" className="bg-white text-black py-16 px-6 md:px-12 lg:px-24">
  <div className="flex flex-col md:flex-row items-center gap-12">
    
    {/* Image on the Left */}
    <div className="w-full md:w-1/2">
      <img 
        src="/girl scan.jpg" 
        alt="Smart Recycling with BebaPay" 
        className="rounded-xl shadow-md object-cover w-full h-full max-h-[500px]" 
      />
    </div>

    {/* Text Content on the Right */}
    <div className="w-full md:w-1/2 space-y-5">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700">
        About BebaPay
      </h2>
      <p className="text-lg leading-relaxed">
        <strong>BebaPay</strong> is a tokenized recycling system designed to reward individuals for sustainable action. 
        Users scan a unique barcode on a recyclable bag, place it in our smart bin, and the bin automatically measures the weight. 
        The system then assigns token rewards to the user’s wallet based on the material's weight and type.
      </p>
      <p className="text-lg leading-relaxed">
        Our goal is to create a circular economy that values waste and empowers communities to reduce environmental impact while earning digital rewards — 
        bridging technology and sustainability.
      </p>
      <p className="text-lg leading-relaxed text-green-800 font-medium">
        Join us in revolutionizing recycling — one bag, one token at a time.
      </p>
    </div>
  </div>
</section>



      <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700">
          How It Works
        </h2>
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

   <section className="bg-green-50 py-16 px-6 md:px-12 lg:px-24 text-center text-black">
  <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
    Why Choose BebaPay?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Feature 1 */}
    <div className="flex flex-col items-center">
      <div className="bg-green-100 p-5 rounded-full mb-4">
        <svg className="w-14 h-14 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
      <p className="text-base text-gray-700">Blockchain-backed token system ensures all transactions are traceable and secure.</p>
    </div>

    {/* Feature 2 - Updated Icon */}
<div className="flex flex-col items-center">
  <div className="bg-green-100 p-5 rounded-full mb-4">
    <svg className="w-14 h-14 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 11-6 0 3 3 0 016 0zM6 11a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  </div>
  <h3 className="text-xl font-semibold mb-2">Empowers Communities</h3>
  <p className="text-base text-gray-700">Earn rewards and reduce pollution — turning waste into wealth for everyone.</p>
</div>


    {/* Feature 3 */}
    <div className="flex flex-col items-center">
      <div className="bg-green-100 p-5 rounded-full mb-4">
        <svg className="w-14 h-14 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Eco-Friendly Innovation</h3>
      <p className="text-base text-gray-700">Combines smart bins, mobile tech, and green values to drive sustainable change.</p>
    </div>
  </div>
</section>


    <section className="w-full py-16 bg-white">
  <div className="container px-4 md:px-6">
    <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
      Nearby Collection Points
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "Recycling Point - Westlands",
          location: "Nairobi",
          img: "/Westlands.png",
          info: "Open Mon–Sat, 8AM–5PM. Accepts plastic, glass, and metals.",
        },
        {
          name: "GreenHub Point - CBD",
          location: "Nairobi",
          img: "/cbd.jpg",
          info: "Open daily. Offers bonus tokens on weekends.",
        },
        {
          name: "Smart Bin - Upper Hill",
          location: "Nairobi",
          img: "/upperhill.jpg",
          info: "24/7 Smart Bin access. Automated weighing and rewards.",
        },
      ].map((point, index) => (
        <div
          key={index}
          className="group relative bg-green-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={point.img}
            alt={point.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold text-green-900">{point.name}</h3>
            <p className="text-gray-600">{point.location}</p>
          </div>
          {/* Hover Info Overlay */}
          <div className="absolute inset-0 bg-green-900 bg-opacity-90 text-white flex items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm leading-relaxed">{point.info}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

</Layout>
  )
}
