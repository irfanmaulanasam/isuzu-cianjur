'use client'
import Link from "next/link"
import { Home, Frown } from "lucide-react"
import { useLanguage } from "@/src/context/languageContext"
export default function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col items-center justify-center bg-white p-10 sm:p-20 rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Ilustrasi / Ikon */}
        <div className="text-7xl sm:text-9xl font-extrabold text-red-600 mb-6">404</div>
        <Frown className="text-red-500 w-16 h-16 mb-8" />

        <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 text-center">
          {language === 'id' ? 'Ups! Halaman Tidak Ditemukan.' : 'Oops! Page Not Found.'}
        </h1>
        <p className="text-lg text-slate-600 mb-10 text-center max-w-xl">
          {language === 'id' 
            ? 'Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau alamatnya salah ketik. Mari kita kembali ke jalan yang benar!' 
            : 'Sorry, the page you are looking for might have been deleted, moved, or mistyped. Let\'s get back on the right path!'}
        </p>

        {/* Tombol Kembali ke Home */}
        <Link 
          href="/" 
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 mb-6 flex items-center"
        >
          <Home className="w-5 h-5 mr-2" /> {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
        </Link>

        {/* Bantuan Tambahan */}
        <div className="mt-8 text-center border-t pt-6 w-full max-w-md">
          <p className="text-sm text-slate-500 mb-3">
            {language === 'id' ? 'Atau, coba cari informasi penting di sini:' : 'Or, try searching for important information here:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={'/products'} className="text-sm text-blue-600 hover:text-blue-800 font-medium">{language === 'id' ? 'Model Mobil' : 'Car Models'}</Link>
            <span className="text-slate-400">|</span>
            <Link href={'/news/promo'} className="text-sm text-blue-600 hover:text-blue-800 font-medium">{language === 'id' ? 'Lihat Promo' : 'View Promo'}</Link>
            <span className="text-slate-400">|</span>
            <Link href={'/contact'} className="text-sm text-blue-600 hover:text-blue-800 font-medium">{language === 'id' ? 'Kontak Kami' : 'Contact Us'}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}