// pages/api/chat.js
export default function handler(req, res) {
  const { message } = req.body;

  // Logic simple
  let reply = "Terima kasih! Ada yang bisa saya bantu mengenai Isuzu Cianjur?";

  if (message.toLowerCase().includes("harga")) {
    reply = "Untuk harga unit Isuzu, mohon sebutkan tipe yang ingin Anda cek 😊";
  }

  if (message.toLowerCase().includes("traga")) {
    reply = "Isuzu Traga Ready! Mau harga OTR atau simulasi kredit?";
  }

  if (message.toLowerCase().includes("halo")) {
    reply = "Halo! Terima kasih sudah berkunjung ke Isuzu Bahana Cianjur 🚚";
  }

  res.status(200).json({ reply });
}