// app/outlet/OutletClient.jsx (VERSI SIMPLE)
'use client';

import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IndexButton from "../components/ui/IndexButton";

export default function OutletClient({ outlets }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOutlet = outlets[activeIndex];

  if (!outlets || outlets.length === 0) {
    return <div>Data outlet tidak tersedia</div>;
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container mx-auto max-w-5xl">
        {/* Judul */}
        <motion.div
          key="title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Lokasi Dealer Kami
          </h2>
        </motion.div>

        {/* Tombol outlet - TANPA MOTION */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {outlets.map((outlet, index) => (
            <IndexButton 
            key={outlet.id}
            isActive={index === activeIndex}
            onClick={()=> setActiveIndex(index)}
            >
              {outlet.name}
            </IndexButton>
          ))}
        </div>

        {/* Info dan Map */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Info */}
          <motion.div 
            key={`info-${activeOutlet.id}`}
            className="flex-1 flex items-start space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MapPin className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-xl">{activeOutlet.name}</h3>
              <p className="text-gray-600 mb-3">{activeOutlet.address}</p>
              <a
                href={activeOutlet.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                Buka di Google Maps
              </a>
            </div>
          </motion.div>

          {/* Map dengan animasi */}
          <div className="flex-1 w-full h-[300px] rounded-xl overflow-hidden shadow-md relative">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={activeOutlet.embed}
                src={activeOutlet.embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Lokasi ${activeOutlet.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}