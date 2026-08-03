'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data slide (Sesuaikan dengan data kamu)
import SLIDES from '../../../src/data/carousel/slides.json'
const AUTOPLAY_INTERVAL = 6000; // 6 detik (sesuai rentang 5-7 detik)

export default function HeroCarousel({ slides = SLIDES }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Timer Autoplay + Auto Pause saat IsPaused = true
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, AUTOPLAY_INTERVAL);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const currentSlide = slides[currentIndex];

  // Efek Variasi Animasi Slide
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative w-full aspect-video min-h-[500px] max-h-[1080px] overflow-hidden bg-slate-900 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 1. LAYER SLIDE GAMBAR & ANIMAASI */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Gambar Utama (1920x1080 Aspect Ratio) */}
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlay Gradient Soft untuk Legibilitas Teks */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 2. LAYER HTML OVERLAY (SAFE AREA ~1200 x 700 px) */}
      <div className="absolute inset-0 z-10 flex items-center justify-start pointer-events-none">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-12 py-8 min-h-[300px] sm:min-h-[500px] flex flex-col justify-center">
          <motion.div
            key={`content-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-white space-y-4 pointer-events-auto"
          >
            {currentSlide.tagline && (
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded">
                {currentSlide.tagline}
              </span>
            )}

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              {currentSlide.title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 line-clamp-3 leading-relaxed">
              {currentSlide.description}
            </p>

            {/* Tombol CTA */}
            <div className="pt-2 flex flex-wrap gap-3">
              {currentSlide.ctaPrimary && (
                <a
                  href={currentSlide.ctaPrimary.href}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg text-sm sm:text-base"
                >
                  {currentSlide.ctaPrimary.text}
                </a>
              )}
              {currentSlide.ctaSecondary && (
                <a
                  href={currentSlide.ctaSecondary.href}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  {currentSlide.ctaSecondary.text}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. TOMBOL NAVIGASI (KIRI & KANAN) */}
      <button
        onClick={prevSlide}
        aria-label="Slide sebelumnya"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100 hidden sm:flex items-center justify-center"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide berikutnya"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100 hidden sm:flex items-center justify-center"
      >
        <ChevronRight size={28} />
      </button>

      {/* 4. INDIKATOR DOTS & AUTOPLAY STATUS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Ke slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'w-8 bg-red-600' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}