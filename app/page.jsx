import Image from 'next/image';
import Hero from './components/sections/Hero';
import ValueProps from './components/sections/ValueProps';
import PromoGrid from './components/sections/PromoGrid';
import QuickTools from './components/sections/QuickTools';
import Testimonials from './components/sections/Testimonial';
import StoryBrand from './components/sections/StoryBrand';
import CTASection from './components/sections/CTASection';

export const metadata = {
  title: 'Bahana Isuzu — Solusi Kendaraan Komersial Euro 4',
  description:
    'Bahana Isuzu: kendaraan komersial Euro 4 dengan TCO rendah, layanan aftersales, dan solusi bisnis untuk UMKM hingga perusahaan besar.',
};

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <Hero />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <ValueProps />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <PromoGrid />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <QuickTools />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <Testimonials />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <StoryBrand />
        </div>
      </section>

      <CTASection />
    </main>
  );
}