import { getDPPById } from "@/lib/supabase/helpers";
import QRCodeDisplay from "@/components/QRCodeDisplay";

export default async function DPPPage({ params }: { params: { id: string } }) {
  const dpp = await getDPPById(params.id);
  if (!dpp) return <div className="text-center py-12">DPP introuvable</div>;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dpp-saas-atntpns-projects.vercel.app";
  const dppUrl = appUrl + "/dpp/" + dpp.id;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1D1D1F]">{dpp.products.name}</h1>
        <p className="text-lg text-[#86868B]">GTIN: {dpp.products.gtin}</p>
      </div>

      <div className="mb-8 flex justify-center">
        <QRCodeDisplay dppUrl={dppUrl} />
      </div>

      <div className="bg-[#F5F5F7] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#1D1D1F]">Donnees du DPP</h2>
        <pre className="text-sm overflow-auto bg-white p-4 rounded border border-[#E5E5EA]">
          {JSON.stringify(dpp.data, null, 2)}
        </pre>
      </div>

      <div className="mt-8 text-sm text-[#86868B] text-center">
        <p>Ce DPP est genere conformement au reglement UE 2024/1781. Le fabricant est responsable de l exactitude des donnees.</p>
      </div>
    </div>
  );
}