export type ProductId =
  | 'couscous_royal'
  | 'couscous_merguez'
  | 'couscous_poulet'
  | 'couscous_boulettes'
  | 'couscous_2_viandes'
  | 'couscous_vegetarien'
  | 'tajine_poulet_abricot'
  | 'tajine_poulet_amandes'
  | 'tajine_kefta_pruneaux'
  | 'tajine_vegetarien'
  | 'corne_gazelle_piece'
  | 'macrouts_piece'
  | 'montecaos_cannelle_piece'
  | 'caprilu_citron_piece'
  | 'coffret_mix_6'
  | 'coffret_mix_12'
  | 'coffret_mix_18';

export const productPricesCents: Record<ProductId, number> = {
  // La Graine
  couscous_royal: 2000,
  couscous_merguez: 1650,
  couscous_poulet: 1650,
  couscous_boulettes: 1750,
  couscous_2_viandes: 1850,
  couscous_vegetarien: 1400,
  // Les Tajines
  tajine_poulet_abricot: 1950,
  tajine_poulet_amandes: 1950,
  tajine_kefta_pruneaux: 1850,
  tajine_vegetarien: 1750,
  // La Gazelle
  corne_gazelle_piece: 250,
  macrouts_piece: 220,
  montecaos_cannelle_piece: 50,
  caprilu_citron_piece: 300,
  coffret_mix_6: 1250,
  coffret_mix_12: 2490,
  coffret_mix_18: 3790,
};

export function formatEuroFromCents(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(euros);
}

export const productLabels: Record<ProductId, string> = {
  // La Graine
  couscous_royal: 'Couscous Royal',
  couscous_merguez: 'Couscous Merguez',
  couscous_poulet: 'Couscous Poulet',
  couscous_boulettes: 'Couscous Boulettes',
  couscous_2_viandes: 'Couscous 2 Viandes',
  couscous_vegetarien: 'Couscous Végétarien',
  // Les Tajines
  tajine_poulet_abricot: 'Tajine Poulet Abricot',
  tajine_poulet_amandes: 'Tajine Poulet Amandes',
  tajine_kefta_pruneaux: 'Tajine Kefta Pruneaux',
  tajine_vegetarien: 'Tajine Végétarien',
  // La Gazelle
  corne_gazelle_piece: 'Corne de gazelle (pièce)',
  macrouts_piece: 'Macrouts (pièce)',
  montecaos_cannelle_piece: 'Montecaos cannelle (pièce)',
  caprilu_citron_piece: 'Caprilu au citron (pièce)',
  coffret_mix_6: 'Coffret mix 6 pièces',
  coffret_mix_12: 'Coffret mix 12 pièces',
  coffret_mix_18: 'Coffret mix 18 pièces',
};

// Bundle pricing for pastries (per lot total)
const pastryBundles: Partial<Record<ProductId, { sixTotal: number; twelveTotal: number }>> = {
  corne_gazelle_piece: { sixTotal: 1250, twelveTotal: 2390 },
  macrouts_piece: { sixTotal: 1100, twelveTotal: 1990 },
  montecaos_cannelle_piece: { sixTotal: 1050, twelveTotal: 1990 },
  caprilu_citron_piece: { sixTotal: 1500, twelveTotal: 3050 },
};

export function getLineTotalCents(productId: ProductId, quantity: number): number {
  const unit = productPricesCents[productId];
  const bundles = pastryBundles[productId];
  if (!bundles || quantity <= 0) {
    return unit * Math.max(0, quantity);
  }
  let remaining = Math.floor(quantity);
  let total = 0;
  const count12 = Math.floor(remaining / 12);
  if (count12 > 0) {
    total += count12 * bundles.twelveTotal;
    remaining -= count12 * 12;
  }
  const count6 = Math.floor(remaining / 6);
  if (count6 > 0) {
    total += count6 * bundles.sixTotal;
    remaining -= count6 * 6;
  }
  if (remaining > 0) {
    total += remaining * unit;
  }
  return total;
}

export type StripeBreakdownItem = {
  name: string;
  unitAmountCents: number;
  quantity: number;
};

export function getStripeBreakdown(productId: ProductId, quantity: number): StripeBreakdownItem[] {
  const unit = productPricesCents[productId];
  const label = productLabels[productId];
  const bundles = pastryBundles[productId];
  if (!bundles || quantity <= 0) {
    return quantity > 0 ? [{ name: label, unitAmountCents: unit, quantity: Math.floor(quantity) }] : [];
  }
  let remaining = Math.floor(quantity);
  const items: StripeBreakdownItem[] = [];
  const count12 = Math.floor(remaining / 12);
  if (count12 > 0) {
    items.push({ name: `${label} x12 (lot)`, unitAmountCents: bundles.twelveTotal, quantity: count12 });
    remaining -= count12 * 12;
  }
  const count6 = Math.floor(remaining / 6);
  if (count6 > 0) {
    items.push({ name: `${label} x6 (lot)`, unitAmountCents: bundles.sixTotal, quantity: count6 });
    remaining -= count6 * 6;
  }
  if (remaining > 0) {
    items.push({ name: `${label} (pièce)`, unitAmountCents: unit, quantity: remaining });
  }
  return items;
}


