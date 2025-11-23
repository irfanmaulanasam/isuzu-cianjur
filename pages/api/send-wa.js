// pages/api/send-wa.js
const token_fonnte = process.env.FONNTE_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { target, message, file, filename } = req.body;
  const token = token_fonnte

  const formData = new FormData();
  formData.append('target', target);
  formData.append('message', message || '');
  
  // Jika kirim file (PDF)
  if (file) {
    formData.append('file', file); // Base64 string
    formData.append('filename', filename);
  }

  try {
    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { Authorization: token },
      body: formData,
    });
    
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.log(error,'error send wa');
    res.status(500).json({ error: 'Gagal kirim WA' });
  }
}