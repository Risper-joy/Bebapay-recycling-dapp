import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-500 text-white py-10 px-6 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Brand and tagline */}
        <div>
          <h2 className="text-xl font-bold hover:text-green-400 transition-colors">Beba Pay</h2>
          <p className="text-sm mt-2 text-white hover:text-green-400 transition-colors">
            Recycle. Earn. Make the world cleaner.
          </p>
        </div>

        {/* Middle: Contact Info */}
        <div>
          <h3 className="font-semibold text-sm mb-3 hover:text-green-400 transition-colors">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm text-white hover:text-green-400 transition-colors">
            <Mail className="h-4 w-4 text-white" />
            <a href="mailto:support@bebapay.com" className="text-white hover:text-green-400 transition-colors">support@bebapay.com</a>
          </p>
          <p className="flex items-center gap-2 text-sm mt-2 text-white hover:text-green-400 transition-colors">
            <Phone className="h-4 w-4 text-white" />
            <a href="tel:+254712345678" className="text-white hover:text-green-400 transition-colors">+254 712 345 678</a>
          </p>
        </div>

        {/* Right: Social Media & Legal */}
        <div>
          <h3 className="font-semibold text-sm mb-3 hover:text-green-400 transition-colors">Follow Us</h3>
          <div className="flex gap-4 items-center mb-4">
            <Link href="https://facebook.com" target="_blank" className="text-white hover:text-green-400 transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-white hover:text-green-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-white hover:text-green-400 transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-white hover:text-green-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/terms" className="text-white hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-white hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-white mt-6 hover:text-green-400 transition-colors">
        © 2025 Beba Pay. All rights reserved.
      </div>
    </footer>
  )
}
