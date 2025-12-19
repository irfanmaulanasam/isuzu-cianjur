'use client';

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IndexButton from "../components/ui/IndexButton";
import CTACard from "@/app/components/CTACard";
import { useLanguage } from "@/src/context/languageContext";
import ID from "@/src/data/outlets/id.json";
import EN from "@/src/data/outlets/en.json";

export default function OutletClient({ outlets }) {
  const { language } = useLanguage();

  const text = useMemo(
    () => (language === "en" ? EN : ID),
    [language]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  if (!outlets || outlets.length === 0) {
    return (
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-3xl text-center text-slate-600 dark:text-slate-300">
          {language === "en" ? "Outlet data is not available" : "Data outlet tidak tersedia"}
        </div>
      </section>
    );
  }

  const activeOutlet = outlets[activeIndex];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto max-w-5xl">
        {/* Judul */}
        <motion.div
          key="title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-slate-50">
            {text.title}
          </h2>
        </motion.div>

        {/* Tombol outlet */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {outlets.map((outlet, index) => (
            <IndexButton
              key={`${outlet.id}-${index}`}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
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
            <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-semibold text-xl text-slate-900 dark:text-slate-50">
                {activeOutlet.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {activeOutlet.address}
              </p>
              <a
                href={activeOutlet.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 dark:bg-blue-500 text-white text-sm px-4 py-2 rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-400 transition"
              >
                {text.buttonText}
              </a>
            </div>
          </motion.div>

          {/* Map dengan animasi */}
          <div className="flex-1 w-full h-[300px] rounded-xl overflow-hidden shadow-md relative bg-slate-200 dark:bg-slate-800">
            <AnimatePresence mode="wait" initial={false}>
              <motion.iframe
                key={activeOutlet.embed}
                src={activeOutlet.embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Lokasi ${activeOutlet.name}`}
                className="bg-slate-200 dark:bg-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Optional CTA di bawah */}
        {/* <div className="mt-10">
          <CTACard />
        </div> */}
      </div>
    </section>
  );
}