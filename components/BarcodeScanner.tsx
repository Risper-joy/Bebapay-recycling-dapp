"use client"; 
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function ScanPage() {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const qrCodeRegionId = "qr-reader";
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const startScanner = async () => {
      const formatsToSupport = [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.UPC_A,
      ];

      const config = {
        fps: 10,
        qrbox: 250,
        formatsToSupport,
      };

      const qrCode = new Html5Qrcode(qrCodeRegionId);
      html5QrCodeRef.current = qrCode;

      try {
        await qrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            setScannedCode(decodedText);
            qrCode.stop();
          },
          (errorMessage) => {
            console.warn("Scan error", errorMessage);
          }
        );
      } catch (err) {
        console.error("Failed to start scanner", err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div>
      <h1>QR & Barcode Scanner</h1>
      <div id={qrCodeRegionId} style={{ width: "300px" }}></div>
      {scannedCode && (
        <p>
          <strong>Scanned Result:</strong> {scannedCode}
        </p>
      )}
    </div>
  );
}
