"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Layout } from "@/components/layout"
import { BrowserMultiFormatReader } from "@zxing/browser"

export default function ScanPage() {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [reward, setReward] = useState(0)
  const [error, setError] = useState("")
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null)
  const [barcodeFormat, setBarcodeFormat] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const isMobile = useMobile()
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize the barcode reader
  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader()

    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks()
        tracks.forEach(track => track.stop()) // Stop all video tracks
      }
    }
  }, [])

  // Start scanning for barcodes
  const startScanning = async () => {
    setScanning(true)
    setScanned(false)
    setError("")
    setBarcodeResult(null)
    setBarcodeFormat(null)

    try {
      if (!videoRef.current || !codeReaderRef.current) return

      // Get list of available video input devices
      const videoInputDevices = await navigator.mediaDevices.enumerateDevices()

      // Filter for video input devices
      const videoDevices = videoInputDevices.filter(device => device.kind === "videoinput")

      // For mobile, try to use the back camera
      const selectedDeviceId = isMobile
        ? videoDevices.find((device) => device.label.toLowerCase().includes("back"))?.deviceId ||
          videoDevices[0]?.deviceId
        : videoDevices[0]?.deviceId

      if (!selectedDeviceId) {
        throw new Error("No camera found")
      }

      // Start continuous scanning
      codeReaderRef.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
        if (result) {
          // Stop scanning when a barcode is found
          setScanned(true)
          setScanning(false)
          setBarcodeResult(result.getText())
          setBarcodeFormat(result.getBarcodeFormat().toString())

          // Generate a random reward between 5 and 20
          const randomReward = Math.floor(Math.random() * 16) + 5
          setReward(randomReward)

          // Stop the video stream
          stopScanning()
        }

        if (error && !(error instanceof TypeError)) {
          // Ignore TypeError as it's often thrown when no barcode is detected
          console.error("Scan error:", error)
        }
      })

      // Start the video stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectedDeviceId } }
      })
      videoRef.current.srcObject = stream
      streamRef.current = stream

    } catch (err) {
      console.error("Camera access error:", err)
      setError("Could not access camera. Please check permissions.")
      setScanning(false)
    }
  }

  // Stop scanning
  const stopScanning = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks()
      tracks.forEach(track => track.stop()) // Stop all video tracks
    }

    setScanning(false)
    setBarcodeResult(null)
    setBarcodeFormat(null)
    setReward(0)
  }

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
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  <p>You earned {reward} Cypherium for recycling this item!</p>
                  {barcodeResult && (
                    <div className="mt-2 text-sm">
                      <p>
                        <strong>Barcode:</strong> {barcodeResult}
                      </p>
                      <p>
                        <strong>Format:</strong> {barcodeFormat}
                      </p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {scanning ? (
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Camera preview will appear here</p>
                </div>
              )}

              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-green-500 rounded-lg"></div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!scanning ? (
              <Button onClick={startScanning} disabled={scanning} className="bg-green-600 hover:bg-green-700">
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
