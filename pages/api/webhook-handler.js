// pages/api/webhook-handler.js (Contoh)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Asumsi: Pesan masuk (teks) ada di req.body.message
  const message = req.body.message ? req.body.message.toLowerCase() : '';
  const sender = req.body.sender; // Nomor pengirim

  let reply;

  if (message === "hello") {
    reply = {
      message: "Hello, welcome to Isuzu Digital Service!",
    };
  } else if (message === "audio") {
    reply = {
      message: "Audio message",
      url: "https://filesamples.com/samples/sound/mp3/sample3.mp3",
      filename: "music",
    };
  } else if (message === "video") {
    reply = {
      message: "video message",
      url: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
    };
  } else if (message === "file") {
    reply = {
      message: "file message",
      url: "https://filesamples.com/samples/document/docx/sample3.docx",
      filename: "document",
    };
  } else {
    reply = {
      message: `Sorry, I don't understand. Please use one of the following keyword: Hello, Audio, Video, Image, File`,
    };
  }
  
  // Dalam lingkungan Next.js, Anda perlu memanggil fungsi sendFonnte di sini.
  // Contoh: await sendFonnteJS(sender, reply); 
  // (fungsi ini harus Anda buat sendiri menggunakan fetch ke API Fonnte)

  // Mengirim respons 200 ke Fonnte untuk mengonfirmasi penerimaan
  res.status(200).json({ status: 'success', sent_reply: reply });
}