// import React, { useState, useEffect, useCallback } from 'react';
// import { Home, Frown, ArrowRight, Rss, Percent, Calendar } from 'lucide-react';
// import Image from 'next/image';
// import mockData from '@/src/data/newsData'

// // Komponen Card Konten
// const ContentCard = ({ item }) => {
//     const isPromo = item.category === 'promo';
//     const isEvent = item.category === 'event';
    
//     let categoryColor = 'bg-slate-400';
//     let categoryText = 'Berita';
//     let ctaButton = null;
//     let categoryIcon = <Rss className="w-4 h-4 mr-1"/>;

//     if (isPromo) {
//         categoryColor = 'bg-green-500';
//         categoryText = 'PROMO';
//         categoryIcon = <Percent className="w-4 h-4 mr-1"/>;
//         ctaButton = (
//             <button className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition shadow-md">
//                 Hubungi Sales
//             </button>
//         );
//     } else if (isEvent) {
//         categoryColor = 'bg-blue-500';
//         categoryText = 'EVENT';
//         categoryIcon = <Calendar className="w-4 h-4 mr-1"/>;
//         ctaButton = (
//             <button className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition shadow-md">
//                 Daftar Event
//             </button>
//         );
//     }

//     return (
//         <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200">
//             <div className="relative">
//                 {/* Placeholder Image */}
//                 <Image 
//                     src={item.image} 
//                     onError={(e) => {
//                         e.target.onerror = null; 
//                         e.target.src = 'https://placehold.co/600x400/94a3b8/ffffff?text=Gambar+Tidak+Tersedia';
//                     }} 
//                     alt={`Gambar untuk ${item.title}`} 
//                     className="w-full h-48 object-cover"
//                 />
                
//                 {/* Kategori Label */}
//                 <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${categoryColor} shadow-md flex items-center`}>
//                     {categoryIcon} {categoryText}
//                 </span>

//                 {/* Urgensi Label (untuk Promo) */}
//                 {item.isUrgent && isPromo && (
//                     <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-red-600 text-white animate-pulse shadow-lg">
//                         TERBATAS!
//                     </span>
//                 )}
//             </div>
//             <div className="p-5">
//                 <p className="text-sm text-slate-500 mb-2">{item.date}</p>
//                 <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-green-600 transition duration-200">{item.title}</h3>
//                 <p className="text-slate-600 mb-4 text-sm">{item.summary}</p>
//                 <a href="#" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition duration-200">
//                     Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
//                 </a>
//                 {ctaButton}
//             </div>
//         </div>
//     );
// };

// // Komponen Halaman News Hub
// const NewsHubPage = ({ activeCategory, setActiveCategory }) => {
//     // Logika filter konten
//     const filteredData = activeCategory === 'all' 
//         ? mockData 
//         : mockData.filter(item => item.category === activeCategory);

//     // Daftar Kategori untuk Tab
//     const categories = [
//         { key: 'all', label: 'Semua' },
//         { key: 'news', label: 'News (Berita Umum)' },
//         { key: 'promo', label: 'Promo (Penawaran Khusus)' },
//         { key: 'event', label: 'Event (Acara Komunitas)' },
//     ];

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-2xl">
//             <h1 className="text-3xl font-bold text-slate-800 mb-2">
//                 Informasi & Kegiatan Dealer Cianjur
//             </h1>
//             <p className="text-slate-600 mb-6">
//                 Temukan berita terbaru, penawaran menarik, dan jadwal event di Cianjur.
//             </p>

//             {/* Navigasi / Filter Tab */}
//             <div className="flex space-x-2 p-1 bg-slate-100 rounded-lg mb-8 overflow-x-auto whitespace-nowrap">
//                 {categories.map((cat) => (
//                     <button 
//                         key={cat.key}
//                         onClick={() => setActiveCategory(cat.key)}
//                         className={`px-4 py-2 text-sm text-slate-700 rounded-md transition duration-200 hover:bg-slate-200
//                             ${activeCategory === cat.key ? 'active-tab' : 'bg-transparent'}`
//                         }
//                     >
//                         {cat.label}
//                     </button>
//                 ))}
//             </div>

//             {/* Area Konten Berita (Grid) */}
//             <div id="content-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredData.length > 0 ? (
//                     filteredData.map(item => <ContentCard key={item.id} item={item} />)
//                 ) : (
//                     <p className="col-span-full text-center text-slate-500 py-10">
//                         Belum ada konten untuk kategori ini.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// // Komponen Halaman Error 404
// const ErrorPage = () => (
//     <div className="flex flex-col items-center justify-center bg-white p-10 sm:p-20 rounded-xl shadow-2xl">
//         {/* Ilustrasi / Ikon */}
//         <div className="text-7xl sm:text-9xl font-extrabold text-red-600 mb-6">404</div>
//         <Frown className="text-red-500 w-16 h-16 mb-8" />

//         <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-4 text-center">
//             Ups! Halaman Tidak Ditemukan.
//         </h1>
//         <p className="text-lg text-slate-600 mb-10 text-center max-w-xl">
//             Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau alamatnya salah ketik. Mari kita kembali ke jalan yang benar!
//         </p>

//         {/* Aksi Cepat (Call to Action) */}
//         <a href="#" className="px-8 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 mb-6 flex items-center">
//             <Home className="w-5 h-5 mr-2" /> Kembali ke Beranda
//         </a>

//         {/* Bantuan Tambahan */}
//         <div className="mt-8 text-center border-t pt-6 w-full max-w-md">
//             <p className="text-sm text-slate-500 mb-3">
//                 Atau, coba cari informasi penting di sini:
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//                 <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Model Mobil</a>
//                 <span className="text-slate-400">|</span>
//                 <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Lihat Promo</a>
//                 <span className="text-slate-400">|</span>
//                 <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Kontak Kami</a>
//             </div>
//         </div>
//     </div>
// );

// // Komponen Utama Aplikasi
// const App = () => {
//     // State untuk mengelola halaman aktif (news atau error)
//     const [currentPage, setCurrentPage] = useState('news');
//     // State untuk mengelola filter kategori di halaman news
//     const [activeCategory, setActiveCategory] = useState('all');

//     // Gunakan useEffect untuk memastikan kategori reset saat beralih ke halaman news
//     useEffect(() => {
//         if (currentPage === 'news') {
//             setActiveCategory('all');
//         }
//     }, [currentPage]);


//     return (
//         <div className="p-4 sm:p-8 min-h-screen bg-slate-100">
//             {/* Custom Styles */}
//             <style jsx global>{`
//                 body {
//                     font-family: 'Inter', sans-serif;
//                     color: #1e293b;
//                 }
//                 .active-tab {
//                     background-color: #22c55e !important;
//                     color: white !important;
//                     font-weight: 700;
//                 }
//             `}</style>
            
//             {/* Tombol Navigasi Simulasi */}
//             <div className="mb-8 flex space-x-4">
//                 <button 
//                     onClick={() => setCurrentPage('news')} 
//                     className={`px-4 py-2 text-slate-700 rounded-lg shadow-md transition duration-200 ${currentPage === 'news' ? 'bg-slate-300' : 'bg-slate-200 hover:bg-slate-300'}`}
//                 >
//                     Lihat Halaman Berita
//                 </button>
//                 <button 
//                     onClick={() => setCurrentPage('error')} 
//                     className={`px-4 py-2 text-white rounded-lg shadow-md transition duration-200 ${currentPage === 'error' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
//                 >
//                     Simulasi Error 404
//                 </button>
//             </div>

//             {/* Konten Halaman Aktif */}
//             <div className="transition-opacity duration-500">
//                 {currentPage === 'news' && (
//                     <NewsHubPage 
//                         activeCategory={activeCategory} 
//                         setActiveCategory={setActiveCategory} 
//                     />
//                 )}
//                 {currentPage === 'error' && (
//                     <ErrorPage />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default App;