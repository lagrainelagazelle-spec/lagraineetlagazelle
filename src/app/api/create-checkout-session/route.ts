import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialiser Stripe paresseusement pour éviter les erreurs au build si l'env manque
function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-09-30.clover',
  });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json();
    const { product, quantity, fullName, email, phone, address, comments } = body;

    
    // TODO: Récupérer le prix depuis une base de données ou une configuration
    // Pour l'instant, nous utilisons des valeurs fixes
    const productDetails = {
      'produit_a': { name: 'Produit A - Description', price: 1500 }, // 15.00 €
      'produit_b': { name: 'Produit B - Description', price: 2500 }, // 25.00 €
      'produit_c': { name: 'Produit C - Description', price: 3500 }, // 35.00 €
    };

    if (!productDetails[product as keyof typeof productDetails]) {
      return NextResponse.json({ error: 'Produit non valide' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productDetails[product as keyof typeof productDetails].name,
            },
            unit_amount: productDetails[product as keyof typeof productDetails].price,
          },
          quantity: Number(quantity),
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/commande`,
      metadata: {
        // Nous stockons les informations du formulaire ici
        // Elles seront utiles pour notre Google Sheet
        fullName,
        email,
        phone,
        address,
        comments,
        product,
        quantity,
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
