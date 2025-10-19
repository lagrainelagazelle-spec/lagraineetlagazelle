import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { appendToSheet } from '@/lib/google-sheets';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-09-30.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  // Gérer l'événement
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('✅ Paiement réussi pour la session :', session.id);
      
      // Récupérer les métadonnées que nous avons stockées
      const metadata = session.metadata;
      console.log('Métadonnées de la commande :', metadata);

      if (metadata) {
        // 1. Ajouter à Google Sheets
        await appendToSheet(metadata);

        // 2. Envoyer un email de notification
        try {
          await resend.emails.send({
            from: 'noreply@votre-domaine.com', // Doit être un domaine vérifié sur Resend
            to: 'votre-email@gmail.com', // Votre adresse email
            subject: `Nouvelle précommande de ${metadata.fullName}`,
            html: `
              <h1>Nouvelle précommande !</h1>
              <p><strong>Nom:</strong> ${metadata.fullName}</p>
              <p><strong>Email:</strong> ${metadata.email}</p>
              <p><strong>Téléphone:</strong> ${metadata.phone}</p>
              <p><strong>Produit:</strong> ${metadata.product}</p>
              <p><strong>Quantité:</strong> ${metadata.quantity}</p>
              <p><strong>Adresse:</strong> ${metadata.address}</p>
              <p><strong>Commentaires:</strong> ${metadata.comments || 'Aucun'}</p>
            `,
          });
          console.log('✅ Email de notification envoyé.');
        } catch (error) {
          console.error('❌ Erreur lors de l-envoi de l-email:', error);
        }
      }

      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}