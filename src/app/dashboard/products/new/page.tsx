'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, CreditCard, Settings } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { canCreateProduct, createProductWithDPP } from '@/lib/supabase/helpers';

export default function NewProductPage() {
  const { user } = useUser();
  const router = useRouter();
  const [name, setName] = useState('');
  const [gtin, setGtin] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!user?.id) {
      setError('Tu dois etre connecte');
      setIsLoading(false);
      return;
    }

    const canCreate = await canCreateProduct(user.id);
    if (!canCreate) {
      router.push('/pricing?limit_reached=true');
      return;
    }

    try {
      await createProductWithDPP({
        userId: user.id,
        name,
        gtin,
        category,
        description,
      });
      router.push('/dashboard/products');
    } catch (err) {
      setError('Erreur lors de la creation du produit');
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { name: 'Tableau de bord', href: '/dashboard', icon: BarChart3 },
    { name: 'Produits', href: '/dashboard/products', icon: Package },
    { name: 'Abonnements', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Parametres', href: '/dashboard/settings', icon: Settings },
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
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border border-[#E5E5EA]">
            <CardHeader>
              <CardTitle className="text-[#1D1D1F]">Nouveau Produit</CardTitle>
              <CardDescription>
                Ajoutez un nouveau produit pour generer son DPP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Batterie Li-Ion 500Wh"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gtin">GTIN</Label>
                  <Input
                    id="gtin"
                    value={gtin}
                    onChange={(e) => setGtin(e.target.value)}
                    placeholder="ex: 12345678901234"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categorie</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="ex: Electronique, Mobilier"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ex: Batterie haute capacite"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#007AFF] hover:bg-[#006EE6] text-white"
                >
                  {isLoading ? 'Creation...' : 'Creer le Produit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}