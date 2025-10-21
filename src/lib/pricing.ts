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
  montecaos_cannelle_piece: 200,
  caprilu_citron_piece: 300,
  coffret_mix_6: 1250,
  coffret_mix_12: 2490,
  coffret_mix_18: 3790,
};

export function formatEuroFromCents(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(euros);
}


