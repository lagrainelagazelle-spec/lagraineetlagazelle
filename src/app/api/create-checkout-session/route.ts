import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripeBreakdown, ProductId } from '@/lib/pricing';

// Initialiser Stripe paresseusement pour éviter les erreurs au build si l'env manque
function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(secretKey);
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json();
    const { items, product, quantity, fullName, email, phone, houseNumber, streetLine1, streetLine2, postcode, city, comments } = body;

    
    // TODO: Récupérer le prix depuis une base de données ou une configuration
    // Pour l'instant, nous utilisons des valeurs fixes
    const productDetails: Record<string, { name: string; price: number }> = {
      // La Graine
      'couscous_royal': { name: 'Couscous Royal', price: 2000 },
      'couscous_merguez': { name: 'Couscous Merguez', price: 1650 },
      'couscous_poulet': { name: 'Couscous Poulet', price: 1650 },
      'couscous_boulettes': { name: 'Couscous Boulettes', price: 1750 },
      'couscous_2_viandes': { name: 'Couscous 2 Viandes', price: 1850 },
      'couscous_vegetarien': { name: 'Couscous Végétarien', price: 1400 },
      // Les Tajines
      'tajine_poulet_abricot': { name: 'Tajine Poulet Abricot', price: 1950 },
      'tajine_poulet_amandes': { name: 'Tajine Poulet Amandes', price: 1950 },
      'tajine_kefta_pruneaux': { name: 'Tajine Kefta Pruneaux', price: 1850 },
      'tajine_vegetarien': { name: 'Tajine Végétarien', price: 1750 },
      // La Gazelle (prix à la pièce / au coffret)
      'corne_gazelle_piece': { name: 'Corne de gazelle (pièce)', price: 250 },
      'macrouts_piece': { name: 'Macrouts (pièce)', price: 220 },
      'montecaos_cannelle_piece': { name: 'Montecaos cannelle (pièce)', price: 50 },
      'caprilu_citron_piece': { name: 'Caprilu au citron (pièce)', price: 300 },
      'coffret_mix_6': { name: 'Coffret mix 6 pièces', price: 1250 },
      'coffret_mix_12': { name: 'Coffret mix 12 pièces', price: 2490 },
      'coffret_mix_18': { name: 'Coffret mix 18 pièces', price: 3790 },
    };

    // Construire la liste des articles
    const requestedItems = Array.isArray(items) && items.length > 0
      ? items
      : [{ product, quantity }];

    for (const it of requestedItems) {
      if (!productDetails[it.product]) {
        return NextResponse.json({ error: `Produit non valide: ${it.product}` }, { status: 400 });
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: requestedItems.flatMap((it: { product: string; quantity: number }) => {
        const productId = it.product as ProductId;
        const breakdown = getStripeBreakdown(productId, Number(it.quantity || 0));
        if (breakdown.length > 0) {
          return breakdown.map((b) => ({
            price_data: {
              currency: 'eur',
              product_data: { name: b.name },
              unit_amount: b.unitAmountCents,
            },
            quantity: b.quantity,
          }));
        }
        // Fallback pour produits non concernés par bundles
        return [{
          price_data: {
            currency: 'eur',
            product_data: { name: productDetails[it.product].name },
            unit_amount: productDetails[it.product].price,
          },
          quantity: Number(it.quantity || 1),
        }];
      }),
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/commande`,
      metadata: {
        // Nous stockons les informations du formulaire ici
        // Elles seront utiles pour notre Google Sheet
        fullName,
        email,
        phone,
        houseNumber,
        streetLine1,
        streetLine2,
        postcode,
        city,
        comments,
        items: JSON.stringify(requestedItems),
      },
    });

    if (session.url) {
      return NextResponse.json({ url: session.url });
    } else {
      return NextResponse.json({ error: 'Erreur lors de la création de la session Stripe' }, { status: 500 });
    }

  } catch (error) {
    console.error('Erreur API Stripe:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
