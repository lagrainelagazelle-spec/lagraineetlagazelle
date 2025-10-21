import { google } from 'googleapis';

interface OrderData {
  [key: string]: string | number | null | undefined;
}

export async function appendToSheet(data: OrderData) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Définir l'ordre des colonnes (si besoin de créer la feuille, à gérer côté Google Sheets)
    
    // Formatter les données pour correspondre à l'ordre des en-têtes
    const rowData = [
      new Date().toISOString(),
      data.fullName,
      data.email,
      data.phone,
      data.product,
      data.quantity,
      data.address,
      data.comments,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Commandes!A1', // Assurez-vous que le nom de la feuille est correct
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('✅ Données ajoutées à Google Sheets avec succès.');

  } catch (error) {
    console.error('❌ Erreur lors de l-écriture sur Google Sheets:', error);
  }
}
