'use client';
import { useMemo } from 'react';
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from "lucide-react";
import { useLanguage } from '@/src/context/languageContext';
import en from '@/src/data/footer/en.json';
import id from '@/src/data/footer/id.json';

export default function SiteFooter() {
  const { language } = useLanguage();

  // ✅ Gunakan useMemo untuk footer data berdasarkan language
  const footerData = useMemo(() => {
    return language === 'id' ? id : en;
  }, [language]);

  const { footer } = footerData;
  const { navigation, legal } = footer;

  if (!footer) {
    return (
      <footer className="bg-[#004AAD] text-white p-8 text-center">
        <p>Footer config not found.</p>
      </footer>
    );
  }

  return (
    <footer className="bg-[#003680] text-gray-200 pt-14 mt-10 border-t-4 border-[#E31E26] shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* ============== COMPANY INFO ============== */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {footer.company.name}
          </h2>
          <p className="text-gray-300 mt-3 leading-relaxed">
            {footer.company.description}
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E31E26] flex-shrink-0 mt-0.5" />
              <span>{footer.company.address}</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#E31E26] flex-shrink-0" />
              <a href={`tel:${footer.company.phone}`} className="hover:text-white">
                {footer.company.phone}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#E31E26] flex-shrink-0" />
              <a
                href={`https://wa.me/${footer.company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#E31E26] flex-shrink-0" />
              <a href={`mailto:${footer.company.email}`} className="hover:text-white">
                {footer.company.email}
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-6">
            <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition"><Youtube size={20} /></a>
          </div>
        </div>

        {/* ============== NAVIGATION GROUPS ============== */}
        {Object.entries(navigation).map(([section, links]) => (
          <div key={section}>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide capitalize">
              {section === 'news' ? (language === 'id' ? 'Berita' : 'News') : 
               section === 'company' ? (language === 'id' ? 'Perusahaan' : 'Company') :
               section === 'product' ? (language === 'id' ? 'Produk' : 'Product') :
               section === 'services' ? (language === 'id' ? 'Layanan' : 'Services') :
               section === 'tools' ? (language === 'id' ? 'Alat' : 'Tools') : section}
            </h3>

            <ul className="space-y-3 text-sm">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="flex items-center gap-2 hover:text-white transition group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#E31E26] transition-transform group-hover:translate-x-1" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* ============== LEGAL SECTION ============== */}
      <div className="border-t border-[#004AAD] mt-12 py-6 text-center text-sm text-gray-300 bg-[#00306a]">
        <div className="flex justify-center gap-8 mb-2">
          <Link href={legal.privacy} className="hover:text-white transition">
            {language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
          </Link>
          <Link href={legal.terms} className="hover:text-white transition">
            {language === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
          </Link>
        </div>
        <p className="tracking-wide">{legal.copyright}</p>
      </div>
    </footer>
  );
}