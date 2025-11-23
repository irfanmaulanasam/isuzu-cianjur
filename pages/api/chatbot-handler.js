// Memanggil token dari Environment Variable
const FONNTE_TOKEN = process.env.FONNTE_TOKEN;
const FONNTE_API_URL = 'https://api.fonnte.com/send';

// Fungsi bantuan untuk mengirim balasan kembali ke konsumen
async function sendFonnteReply(target, reply) {
    const formData = new FormData();
    formData.append('target', target);
    formData.append('message', reply.message);
    
    // Jika ada file (audio, video, file), tambahkan URL-nya
    if (reply.url) {
        formData.append('url', reply.url);
        if (reply.filename) {
            formData.append('filename', reply.filename);
        }
    }

    try {
        await fetch(FONNTE_API_URL, {
            method: 'POST',
            headers: { Authorization: FONNTE_TOKEN },
            body: formData,
        });
    } catch (error) {
        console.error("Gagal membalas pesan via Fonnte:", error);
    }
}


export default async function handler(req, res) {
    // 1. Pastikan Request adalah POST dari Fonnte
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { target, message, sender, from } = req.body;

    // Fonnte mengirim nomor kita di 'target' dan nomor pengirim di 'sender'/'from'.
    // Kita gunakan 'sender' atau 'from' sebagai nomor yang akan kita balas
    const customerNumber = sender || from;
    // Bersihkan pesan dan ubah ke huruf kecil
    const incomingMessage = message ? message.toLowerCase().trim() : '';

    let replyData; // Variabel untuk menampung balasan kita

    // 2. Logika Chatbot (Sama seperti logika PHP Anda, tapi di JS)
    if (incomingMessage === "hello" || incomingMessage === "halo") {
        replyData = {
            message: "Halo! Selamat datang di Layanan Digital Isuzu Cianjur.\n\nSaya asisten digital Anda. Silakan ketik kata kunci di bawah ini:\n\n*1. Info Unit*\n*2. Service*\n*3. Kontak Sales*\n*4. Promo*",
        };
    } else if (incomingMessage === "audio") {
        replyData = {
            message: "Contoh Pesan Audio",
            url: "https://filesamples.com/samples/sound/mp3/sample3.mp3",
            filename: "music",
        };
    } else if (incomingMessage.includes("unit")) {
        replyData = {
            message: "Isuzu punya banyak pilihan! Mana yang Anda minati?\n\n- TRAGA (Pick Up)\n- ELF (Light Truck)\n- GIGA (Heavy Duty)\n\nAtau kunjungi web kami: isuzu-cianjur.vercel.app",
        };
    } else {
        // Balasan default
        replyData = {
            message: "Maaf, saya belum mengerti pesan Anda.\n\nSilakan gunakan kata kunci yang tersedia seperti: *Halo*, *Info Unit*, *Service*, atau *Kontak Sales*.",
        };
    }

    // 3. Kirim Balasan
    await sendFonnteReply(customerNumber, replyData);
    
    // 4. Konfirmasi ke Fonnte
    res.status(200).json({ status: 'success', customer: customerNumber });
}