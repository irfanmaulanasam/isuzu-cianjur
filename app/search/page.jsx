import Link from "next/link";
import { Truck, Wrench, Star, Contact, Search } from "lucide-react";
export default function SearchPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-50">
            {/* Header */}
            <Search className="h-12 w-12  m-4" />
            <h1 className="text-4xl font-semibold mb-2">
                Search Coming Soon
            </h1>
            <p className="text-gray-600 mb-10 text-center max-w-lg">
                Kami sedang menyiapkan fitur pencarian produk & informasi Isuzu agar lebih akurat, cepat, dan mudah digunakan.
            </p>
            {/* Card */}
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center mb-10">
                <h2 className="text-xl font-medium mb-3">Fitur Sedang Dalam Pengembangan</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Kami sedang mempersiapkan teknologi pencarian yang lebih cerdas untuk kendaraan, promo, dan spesifikasi.
                </p>

                {/* Dummy progress */}
                <div className="flex gap-2 justify-center">
                    <div className="w-8 h-2 bg-blue-600 rounded"></div>
                    <div className="w-8 h-2 bg-blue-600 rounded"></div>
                    <div className="w-8 h-2 bg-blue-600 rounded"></div>
                    <div className="w-8 h-2 bg-gray-300 rounded"></div>
                    <div className="w-8 h-2 bg-gray-300 rounded"></div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4 max-w-md w-full mb-10">
                <Link
                    href="/products"
                    className="bg-white shadow-md rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3 px-4 py-3 transition"
                >
                    <Truck size={28}
                    />
                    <span className="font-medium text-gray-800">
                        Line-Up
                    </span>
                </Link>
                <Link 
                href="/products" 
                className="bg-white shadow-md rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3 px-4 py-3 transition"
                >
                    <Wrench size={28} />
                    <span className="font-medium text-gray-800">
                        Spesifikasi
                    </span>
                </Link>
                <Link href="/news/promo" 
                className="bg-white shadow-md rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3 px-4 py-3 transition"
                >
                    <Star size={28}/> 
                    <span className="font-medium text-gray-800">
                    Promo
                    </span>
                </Link>
                <Link href="" 
                className="bg-white shadow-md rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3 px-4 py-3 transition"
                >
                    <Contact /> Kontak Sales
                </Link>
            </div>

            {/* Back Home */}
            <Link href="/"
                className="bg-bahana-primary text-white px-6 py-3 rounded-md hover:opacity-90"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}
