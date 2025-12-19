'use client';
import { useState, useCallback, useMemo } from "react";
import jsPDF from 'jspdf';
import FormItem from '../components/FormItem'; 
import { useLanguage } from '@/src/context/languageContext';
import ID from '@/src/data/services/bib/forms/id.json';
import EN from '@/src/data/services/bib/forms/en.json';

export default function BookingServiceFormBIB() {
  const { language } = useLanguage();

  const text = useMemo(
    () => (language === 'en' ? EN : ID),
    [language]
  );

  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    alamat: "",
    jenisMobil: "",
    tahunMobil: "",
    nomorPolisi: "",
    jenisService: text.serviceType,
    tanggalBooking: "",
    jamBooking: "",
    keluhan: "",
    captchaChecked: false,
    loading: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const jenisMobilOptions = ["Isuzu Traga", "Isuzu Elf", "Isuzu Giga", "Isuzu D-Max"];
  const tahunMobilOptions = ["2024", "2023", "2022", "2021", "2020"];
  const jamBookingOptions = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  const generatePDF = (data) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;
    const lineHeight = 5;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("PERMINTAAN BOOKING SERVICE ON-SITE (BIB)", margin, y);
    y += lineHeight;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Nomor Form: BIB-${new Date().getTime().toString().slice(-6)}`, margin, y);
    y += lineHeight * 2;

    const drawSection = (title, fields) => {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(title, margin, y);
      y += 4;
      doc.line(margin, y, pageWidth - margin, y);
      y += 2;

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');

      fields.forEach(({ label, value }) => {
        const labelText = label + ":";
        doc.setFont(undefined, 'bold');
        doc.text(labelText, margin + 2, y);
        doc.setFont(undefined, 'normal');
        doc.text(String(value || '-'), margin + 40, y);
        y += lineHeight;
      });
      y += lineHeight / 2;
    };

    drawSection("I. DATA PELANGGAN & LOKASI VISIT", [
      { label: "Nama Pemesan", value: data.nama },
      { label: "No. Telepon (WA)", value: data.telepon },
      { label: "Email", value: data.email },
    ]);

    y += lineHeight * 0.5;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("II. LOKASI ON-SITE (ALAMAT)", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 2;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const alamatLines = doc.splitTextToSize(data.alamat || '-', pageWidth - 2 * margin - 5);
    doc.text(alamatLines, margin + 2, y);
    y += alamatLines.length * 3.5;
    y += lineHeight / 2;

    drawSection("III. PROFIL UNIT", [
      { label: "Jenis Mobil", value: data.jenisMobil },
      { label: "Tahun Mobil", value: data.tahunMobil },
      { label: "Nomor Polisi", value: data.nomorPolisi },
    ]);

    y += lineHeight * 0.5;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("IV. DETAIL LAYANAN & KELUHAN", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 2;

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text("Tipe Layanan:", margin + 2, y);
    doc.setFont(undefined, 'bold');
    doc.text(data.jenisService, margin + 40, y);
    y += lineHeight;

    doc.setFont(undefined, 'normal');
    doc.text("Tanggal/Waktu Visit:", margin + 2, y);
    doc.setFont(undefined, 'bold');
    doc.text(`${data.tanggalBooking} - Pukul ${data.jamBooking} (Estimasi)`, margin + 40, y);
    y += lineHeight;

    doc.setFont(undefined, 'normal');
    doc.text("Keluhan:", margin + 2, y);
    y += lineHeight / 2;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const keluhanLines = doc.splitTextToSize(data.keluhan || '-', pageWidth - 2 * margin - 5);
    doc.text(keluhanLines, margin + 4, y);
    y += keluhanLines.length * 3.5;
    y += lineHeight;

    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.text("Dokumen ini dibuat secara digital dan akan diproses segera oleh Service Advisor.", margin, y);

    return doc.output('datauristring');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, loading: true }));

    try {
      const pdfDataUri = generatePDF(formData);
      console.log("PDF berhasil dibuat dan siap dikirim.", pdfDataUri);

      alert(
        language === 'en'
          ? 'Your Breakdown Service (BIB) booking has been submitted. Our Service Advisor will contact you shortly.'
          : 'Pemesanan Breakdown Service (BIB) berhasil dikirim. Service Advisor akan segera menghubungi Anda!'
      );

      setFormData(prev => ({ ...prev, loading: false }));
    } catch (error) {
      console.error("Gagal memproses booking atau generate PDF:", error);
      alert(
        language === 'en'
          ? 'An error occurred while sending the form. Please try again.'
          : 'Terjadi kesalahan saat mengirim formulir. Coba lagi.'
      );
      setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  // === STANDARD STYLE YANG NANTI DIPAKAI JUGA DI FORM DEALER & SPAREPART ===
  const pageSectionClass = "py-12 bg-gray-50 dark:bg-slate-950 font-sans";
  const cardClass =
    "container mx-auto max-w-4xl p-6 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-800";
  const titleClass =
    "text-3xl font-extrabold text-center mb-2 text-slate-800 dark:text-slate-50";
  const subtitleClass =
    "text-center text-sm text-red-600 dark:text-red-400 font-medium mb-6";
  const sectionHeaderBarClass =
    "px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border-b border-gray-200 dark:border-slate-700";
  const sectionHeaderTextClass =
    "text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-100 uppercase";
  const sectionWrapperClass =
    "border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm";
  const sectionBodyGridClass =
    "p-3 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-3";
  const submitButtonClass =
    "w-full max-w-sm flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <section className={pageSectionClass}>
      <div className={cardClass}>
        <h1 className={titleClass}>{text.title}</h1>
        <p className={subtitleClass}>{text.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-slate-800 dark:text-slate-100">
          {/* 1. DATA PELANGGAN */}
          <div className={sectionWrapperClass}>
            <div className={sectionHeaderBarClass}>
              <div className={sectionHeaderTextClass}>{text.sections.customer}</div>
            </div>
            <div className={sectionBodyGridClass}>
              <div className="md:col-span-4">
                <FormItem
                  label={text.labels.nama}
                  name="nama"
                  type="text"
                  formData={formData}
                  handler={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={text.labels.telepon}
                  name="telepon"
                  type="tel"
                  formData={formData}
                  handler={handleChange}
                  required
                  isNumeric
                />
              </div>
              <div className="md:col-span-2">
                <FormItem
                  label={text.labels.email}
                  name="email"
                  type="email"
                  formData={formData}
                  handler={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-4">
                <FormItem
                  label={text.labels.alamat}
                  name="alamat"
                  type="textarea"
                  formData={formData}
                  handler={handleChange}
                  required
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* 2. PROFIL UNIT */}
          <div className={sectionWrapperClass}>
            <div className={sectionHeaderBarClass}>
              <div className={sectionHeaderTextClass}>{text.sections.vehicle}</div>
            </div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <FormItem
                label={text.labels.jenisMobil}
                name="jenisMobil"
                type="select"
                formData={formData}
                handler={handleChange}
                required
                options={jenisMobilOptions}
              />
              <FormItem
                label={text.labels.tahunMobil}
                name="tahunMobil"
                type="select"
                formData={formData}
                handler={handleChange}
                required
                options={tahunMobilOptions}
              />
              <FormItem
                label={text.labels.nomorPolisi}
                name="nomorPolisi"
                type="text"
                formData={formData}
                handler={handleChange}
                required
              />
            </div>
          </div>

          {/* 3. DETAIL LAYANAN */}
          <div className={sectionWrapperClass}>
            <div className={sectionHeaderBarClass}>
              <div className={sectionHeaderTextClass}>{text.sections.service}</div>
            </div>
            <div className={sectionBodyGridClass}>
              <div className="md:col-span-4">
                <FormItem
                  label={text.labels.jenisService}
                  name="jenisService"
                  type="text"
                  value={formData.jenisService}
                  disabled
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={text.labels.tanggalBooking}
                  name="tanggalBooking"
                  type="date"
                  formData={formData}
                  handler={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FormItem
                  label={text.labels.jamBooking}
                  name="jamBooking"
                  type="select"
                  formData={formData}
                  handler={handleChange}
                  required
                  options={jamBookingOptions}
                />
              </div>

              <div className="md:col-span-4">
                <FormItem
                  label={text.labels.keluhan}
                  name="keluhan"
                  type="textarea"
                  formData={formData}
                  handler={handleChange}
                  required
                  rows={3}
                  placeholder={text.placeholders.keluhan}
                />
              </div>
            </div>
          </div>

          {/* Captcha & Submit */}
          <div className="flex flex-col items-center pt-4">
            <div className="flex items-center space-x-2 border border-slate-300 dark:border-slate-600 p-3 w-max rounded-md bg-gray-50 dark:bg-slate-900 shadow-inner mb-6">
              <input
                type="checkbox"
                id="captcha"
                name="captchaChecked"
                checked={formData.captchaChecked}
                onChange={handleChange}
                required
                className="h-5 w-5 text-red-600 border-gray-300 dark:border-slate-500 rounded focus:ring-red-500"
              />
              <label htmlFor="captcha" className="text-sm text-slate-700 dark:text-slate-200">
                {text.labels.captcha}
              </label>
            </div>

            <button
              type="submit"
              disabled={formData.loading}
              className={submitButtonClass}
            >
              {formData.loading ? text.labels.submitLoading : text.labels.submit}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          {text.disclaimer}
        </div>
      </div>
    </section>
  );
}
