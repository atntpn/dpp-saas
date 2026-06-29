import { supabase } from "./client";

// Verifier si l utilisateur peut creer un produit (limite freemium)
export async function canCreateProduct(userId: string): Promise<boolean> {
  const { data: user, error } = await supabase
    .from("users")
    .select("max_products, products_count")
    .eq("id", userId)
    .single();

  if (error || !user) return false;
  return user.products_count < user.max_products;
}

// Creer un produit + DPP associe
export async function createProductWithDPP(params: {
  userId: string;
  name: string;
  gtin: string;
  category?: string;
  description?: string;
}) {
  try {
    const { userId, name, gtin, category = "", description = "" } = params;

    // 1. Creer le produit
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({ user_id: userId, name, gtin, category, description })
      .select()
      .single();

    if (productError) throw productError;

    // 2. Generer le JSON-LD conforme ESPR
    const dppData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "GTIN",
        value: gtin,
      },
      name,
      category,
      description,
      digitalProductPassport: {
        "@type": "DigitalProductPassport",
        issuer: {
          "@type": "Organization",
          name: "DPP Pro",
          identifier: "FR123456789",
        },
        issueDate: new Date().toISOString().split("T")[0],
        validIn: ["EU"],
        environmentalFootprint: {
          carbonFootprint: { value: 0, unit: "kg CO2e" },
          resourceEfficiency: { recyclabilityRate: 0.0 },
        },
        compliance: {
          regulation: "EU 2024/1781",
          status: "Compliant",
        },
      },
    };

    // 3. Creer le DPP
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dpp-saas-atntpns-projects.vercel.app";
    const dppUrl = appUrl + "/dpp/" + product.id;
    const { error: dppError } = await supabase
      .from("digital_product_passports")
      .insert({
        product_id: product.id,
        data: dppData,
        qr_code_url: dppUrl,
        status: "published",
        published_at: new Date().toISOString(),
      });

    if (dppError) throw dppError;

    return { product, dppUrl };
  } catch (error) {
    console.error("Erreur creation produit + DPP:", error);
    throw error;
  }
}

// Lister les produits d un utilisateur
export async function getUserProducts(userId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("* , digital_product_passports(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Recuperer un DPP par ID
export async function getDPPById(dppId: string) {
  const { data, error } = await supabase
    .from("digital_product_passports")
    .select("* , products(*)")
    .eq("id", dppId)
    .single();

  if (error) throw error;
  return data;
}