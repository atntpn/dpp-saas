import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] mb-4">
          Le passeport numérique de vos produits,<br />
          <span className="text-[#007AFF]">simplifié.</span>
        </h1>
        <p className="text-xl text-[#86868B] mb-8 max-w-2xl mx-auto">
          Générez des DPP conformes à l’ESPR en 3 clics. Sans expertise technique.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-[#007AFF] hover:bg-[#006EE6] text-white px-8 py-3 rounded-xl text-lg">
            Commencer gratuitement
          </Button>
          <Button size="lg" variant="outline" className="border-[#E5E5EA] hover:bg-[#F5F5F7] px-8 py-3 rounded-xl text-lg">
            En savoir plus
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1D1D1F] mb-12">
            Pourquoi choisir DPP Pro ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Conforme ESPR", desc: "100% conforme au règlement UE 2024/1781." },
              { title: "Rapide", desc: "Générez un DPP en moins de 1 minute." },
              { title: "Sécurisé", desc: "Hébergement UE, backup automatique." },
            ].map((feature, i) => (
              <Card key={i} className="bg-white border border-[#E5E5EA] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#007AFF] text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#86868B]">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
