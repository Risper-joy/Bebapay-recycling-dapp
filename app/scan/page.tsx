"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Layout } from "@/components/layout"
import { supabase } from "@/lib/supabase"
import { useWallet } from "@/lib/wallet-context"

export default function ScanPage() {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [reward, setReward] = useState(0)
  const [error, setError] = useState("")
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null)
  const [barcodeFormat, setBarcodeFormat] = useState<string | null>(null)
  const isMobile = useMobile()
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerContainerId = "html5-qrcode"
  const { account } = useWallet()

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
      } catch (e) {
        console.error("Error stopping scanner:", e)
      }

      try {
        await scannerRef.current.clear()
      } catch (e) {
        console.error("Error clearing scanner:", e)
      }
    }
    setScanning(false)
  }

  const saveToSupabase = async (code: string, format: string, reward: number) => {
    const { error } = await supabase.from("barcodes").insert([
      {
        wallet_address: account || "unknown",
        code,
        format,
        reward,
        status: "pending",
      },
    ])
    if (error) console.error("Supabase insert error:", error)
  }

  const startScanning = async () => {
    setScanning(true)
    setScanned(false)
    setError("")
    setBarcodeResult(null)
    setBarcodeFormat(null)

    try {
      const formatsToSupport = [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.UPC_A,
      ]

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport,
        aspectRatio: 1.777,
        experimentalFeatures: { useBarCodeDetectorIfSupported: true },
      }

      scannerRef.current = new Html5Qrcode(scannerContainerId)
      const devices = await Html5Qrcode.getCameras()
      if (!devices.length) throw new Error("No camera found")

      const backCamera = isMobile
        ? devices.find((d) => d.label.toLowerCase().includes("back"))?.id || devices[0].id
        : devices[0].id

      await scannerRef.current.start(
        { deviceId: { exact: backCamera } },
        config,
        (decodedText, decodedResult) => {
          setScanned(true)
          setScanning(false)
          setBarcodeResult(decodedText)

          const format = decodedResult?.result?.format?.formatName || "Unknown Format"
          setBarcodeFormat(format)

          const randomReward = Math.floor(Math.random() * 16) + 5
          setReward(randomReward)

          saveToSupabase(decodedText, format, randomReward)
          stopScanning()
        },
        (errorMessage) => {
          console.warn("QR code scan error:", errorMessage)
        }
      )
    } catch (err: any) {
      console.error("Start scanning error:", err)
      setError(err.message || "Failed to start scanner")
      setScanning(false)
    }
  }

  useEffect(() => {
    return () => {
      const cleanup = async () => {
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop()
          } catch (err) {
            console.error("Error stopping scanner:", err)
          }

          try {
            await scannerRef.current.clear()
          } catch (err) {
            console.error("Error clearing scanner:", err)
          }
        }
      }

      cleanup().catch((err) => console.error("Cleanup error:", err))
    }
  }, [])

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Scan Recyclable Item</CardTitle>
            <CardDescription className="text-black">
              Point your camera at the barcode on the recyclable item to earn Cypherium rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {scanned && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-black">Success!</AlertTitle>
                <AlertDescription className="text-black">
                  {barcodeResult && (
                    <div className="mt-2 text-sm">
                      <p>
                        <strong className="text-black">Barcode:</strong> {barcodeResult}
                      </p>
                      <p>
                        <strong className="text-black">Format:</strong> {barcodeFormat}
                      </p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <div id={scannerContainerId} className="absolute inset-0" />
              {!scanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Camera preview will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!scanning ? (
              <Button onClick={startScanning} className="bg-green-600 hover:bg-green-700">
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopScanning} variant="outline">
                Stop Scanning
              </Button>
            )}
            <Link href="/rewards">
              <Button variant="outline">View Rewards</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
