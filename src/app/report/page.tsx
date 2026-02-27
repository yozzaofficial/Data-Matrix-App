"use client"
import React, { useCallback } from "react"
import QrScanner from "../components/reportComponents/QrScanner";

export default function ReportPage(){
  const [qrCode, setQrCode] = React.useState<string>("");
  const [openQrScan, setOpenQrScan] = React.useState(false);

  const handleScan = useCallback((decodedText: string) => {
    setQrCode(decodedText);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Scansione QR Code</h1>
      <button onClick={() => setOpenQrScan(prev => !prev)}>
        {openQrScan ? "Chiudi" : "Apri"} Scanner
      </button>
      {openQrScan && <QrScanner onScan={handleScan} />}
      {qrCode && <p>QR Code rilevato: {qrCode}</p>}
    </div>
  );
}