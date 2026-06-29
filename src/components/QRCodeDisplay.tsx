'use client';

interface QRCodeDisplayProps {
  dppUrl: string;
}

export default function QRCodeDisplay({ dppUrl }: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-lg border border-[#E5E5EA]">
        <div className="w-48 h-48 bg-[#F5F5F7] flex items-center justify-center rounded">
          <p className="text-sm text-[#86868B]">QR Code: {dppUrl}</p>
        </div>
      </div>
    </div>
  );
}
