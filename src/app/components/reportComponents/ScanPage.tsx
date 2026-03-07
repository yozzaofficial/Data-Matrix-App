import QrScanner from "./QrScanner"
import React, { useCallback } from "react"

export default function ScanPage() {
    const [qrCode, setQrCode] = React.useState<string>("");
    const handleScan = useCallback((decodedText: string) => {
        setQrCode(decodedText);
    }, []);
    return <div style={{ padding: "20px" }}>
        <h1>Scansione QR Code</h1>

        <QrScanner onScan={handleScan} />
        {qrCode && <p>QR Code rilevato: {qrCode}</p>}
    </div>
}
