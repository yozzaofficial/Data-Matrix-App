"use client";
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

type QrScannerProps = {
  onScan: (decodedText: string) => void;
};

const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const onScanRef = useRef(onScan);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    const qrRegionId = `qr-reader-${Date.now()}`;
    const qrDiv = document.createElement("div");
    qrDiv.id = qrRegionId;
    wrapper.appendChild(qrDiv);

    const html5QrCode = new Html5Qrcode(qrRegionId);

    const startPromise = html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText: string) => {
          onScanRef.current(decodedText);
        },
        () => {}
      )
      .catch((err) => console.error("Errore avvio:", err));

    return () => {
      startPromise.finally(async () => {
        // 1. Prova stop normale
        try {
          if (html5QrCode.isScanning) {
            await html5QrCode.stop();
            await html5QrCode.clear();
          }
        } catch (_) {}

        // 2. Forza spegnimento camera tramite Web API (kill sicuro)
        try {
          const videos = document.querySelectorAll("video");
          videos.forEach((video) => {
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach((track) => {
                track.stop(); // ← spegne fisicamente la camera
              });
            }
            video.srcObject = null;
          });
        } catch (_) {}

        // 3. Rimuovi div
        try {
          if (qrDiv.parentElement) {
            qrDiv.parentElement.removeChild(qrDiv);
          }
        } catch (_) {}
      });
    };
  }, []);

  return <div ref={containerRef}  />;
};

export default QrScanner;