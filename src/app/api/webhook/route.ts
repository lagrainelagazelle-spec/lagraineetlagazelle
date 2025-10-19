import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { appendToSheet } from '@/lib/google-sheets';
import { Resend } from 'resend';

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(secretKey);
}

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  }
  return secret;
}

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(buf, sig, getWebhookSecret());
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
        try {
          const itemsJson = metadata.items;
          if (itemsJson) {
            // Essayer de parser la liste d'articles envoyée par create-checkout-session
            const parsedItems = JSON.parse(itemsJson as unknown as string) as Array<{ product: string; quantity: number }>;
            if (Array.isArray(parsedItems) && parsedItems.length > 0) {
              for (const item of parsedItems) {
                await appendToSheet({
                  fullName: metadata.fullName,
                  email: metadata.email,
                  phone: metadata.phone,
                  product: item.product,
                  quantity: item.quantity,
                  address: metadata.address,
                  comments: metadata.comments,
                });
              }
            } else {
              await appendToSheet(metadata);
            }
          } else {
            // Rétrocompatibilité si un seul produit a été envoyé
            await appendToSheet(metadata);
          }
        } catch (e) {
          console.error('❌ Erreur parsing/envoi vers Google Sheets:', e);
        }

        // 2. Envoyer un email de notification
        try {
          const resend = getResend();
          const sender = process.env.SENDER_EMAIL || 'noreply@votre-domaine.com';
          const recipient = process.env.DESTINATION_EMAIL || 'votre-email@gmail.com';
          const lines = (() => {
            try {
              const items = metadata.items ? JSON.parse(metadata.items as unknown as string) as Array<{ product: string; quantity: number }> : [];
              if (Array.isArray(items) && items.length > 0) {
                return items.map((it) => `<li>${it.product} × ${it.quantity}</li>`).join('');
              }
            } catch {}
            return `<li>${metadata.product} × ${metadata.quantity}</li>`;
          })();
          await resend.emails.send({
            from: sender,
            to: recipient,
            subject: `Nouvelle précommande de ${metadata.fullName}`,
            html: `
              <h1>Nouvelle précommande !</h1>
              <p><strong>Nom:</strong> ${metadata.fullName}</p>
              <p><strong>Email:</strong> ${metadata.email}</p>
              <p><strong>Téléphone:</strong> ${metadata.phone}</p>
              <p><strong>Articles:</strong></p>
              <ul>${lines}</ul>
              <p><strong>Adresse:</strong> ${metadata.address}</p>
              <p><strong>Commentaires:</strong> ${metadata.comments || 'Aucun'}</p>
            `,
          });
          console.log('✅ Email de notification envoyé.');

          // 3. Envoyer un email de confirmation au client
          if (metadata.email) {
            await resend.emails.send({
              from: sender,
              to: metadata.email,
              subject: 'Votre précommande a été reçue ✔️',
              html: `
                <h1>Merci pour votre précommande</h1>
                <p>Bonjour ${metadata.fullName},</p>
                <p>Nous avons bien reçu votre précommande. Voici le récapitulatif:</p>
                <ul>${lines}</ul>
                <p><strong>Adresse de livraison:</strong> ${metadata.address}</p>
                <p><strong>Commentaires:</strong> ${metadata.comments || 'Aucun'}</p>
                <p style="margin-top:12px">Vous recevrez un message de notre part pour la confirmation suivante (disponibilité, créneau, etc.).</p>
                <p>— La Graine et La Gazelle</p>
              `,
            });
            console.log('✅ Email de confirmation client envoyé.');
          }
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