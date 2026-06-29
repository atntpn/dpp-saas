'use client';

import QRCode from 'react-qr-code';

export default function QRCodeDisplay({ dppUrl }: { dppUrl: string }) {
  return (
    <div className="p-4 bg-white border border-[#E5E5EA] rounded-lg shadow-sm">
      <QRCode value={dppUrl} size={256} level="H" bgColor="#FFFFFF" fgColor="#000000" />
      <p className="mt-2 text-xs text-[#86868B] text-center">Scannez pour acceder au DPP</p>
    </div>
  );
}