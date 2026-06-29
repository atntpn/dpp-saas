import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, BarChart3, Package, CreditCard, Settings } from "lucide-react";

function getStatusClass(status) {
  return status === "Conforme"
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
}

export default function Dashboard() {
  const products = [
    { id: 1, name: "Batterie Li-Ion 500Wh", gtin: "12345678901234", date: "2026-06-19", status: "Conforme" },
    { id: 2, name: "Table Chene", gtin: "9876543210001", date: "2026-06-18", status: "Brouillon" },
  ];

  const stats = [
    { label: "DPP Crees", value: "24" },
    { label: "Scans ce mois", value: "1234" },
    { label: "Conformite", value: "100%" },
  ];

  const navItems = [
    { name: "Tableau de bord", href: "/dashboard", icon: BarChart3 },
    { name: "Produits", href: "/dashboard/products", icon: Package },
    { name: "Abonnements", href: "/dashboard/billing", icon: CreditCard },
    { name: "Parametres", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white border-r border-[#E5E5EA] p-6 hidden md:block">
        <h2 className="text-xl font-bold text-[#007AFF] mb-8">DPP Pro</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 py-2 px-4 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-6 md:p-8 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#1D1D1F]">Tableau de bord</h1>
            <Link href="/dashboard/products/new">
              <Button className="bg-[#007AFF] hover:bg-[#006EE6] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Produit
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-white border border-[#E5E5EA]">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-[#86868B]">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-[#1D1D1F]">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-white border border-[#E5E5EA]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#1D1D1F]">Mes Produits</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868B]" />
                  <Input placeholder="Rechercher un produit..." className="pl-10 bg-[#F5F5F7] border-none" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#86868B]">Nom</TableHead>
                    <TableHead className="text-[#86868B]">GTIN</TableHead>
                    <TableHead className="text-[#86868B]">Date</TableHead>
                    <TableHead className="text-[#86868B]">Statut</TableHead>
                    <TableHead className="text-[#86868B]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => {
                    const statusClass = getStatusClass(product.status);
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="text-[#1D1D1F] font-medium">{product.name}</TableCell>
                        <TableCell className="font-mono text-[#86868B]">{product.gtin}</TableCell>
                        <TableCell className="text-[#86868B]">{product.date}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium " + statusClass>
                            {product.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link href={"/dashboard/products/" + product.id} className="text-[#007AFF] hover:underline">
                            Editer
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}