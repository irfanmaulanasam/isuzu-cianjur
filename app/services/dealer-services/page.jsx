'use client';
import { useState, useMemo } from "react";
import { useLanguage } from '@/src/context/languageContext';
import ID from '@/src/data/services/dealer/forms/id.json';
import EN from '@/src/data/services/dealer/forms/en.json';
import FormItem from '../components/FormItem';
import Breadcrumb from '@/app/components/Breadcrumb';
export default function BookingServiceForm() {
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
    provinsi: "",
    bengkel: "",
    jenisService: "",
    tanggalBooking: "",
    jamBooking: "",
    keluhan: "",
    captchaChecked: false,
    loading: false,
  });

  const { options, labels, placeholders, sections } = text;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Data Booking Dikirim:", formData);
      alert(text.toast.success);
    } catch (err) {
      console.error(err);
      alert(text.toast.error);
    }
  };

  // === STYLE SAMA DENGAN BIB ===
  const pageSectionClass = "py-12 bg-gray-50 dark:bg-slate-950";
  const cardClass =
    "container mx-auto max-w-4xl p-6 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-800";
  const titleClass =
    "text-3xl font-extrabold text-center mb-2 text-slate-800 dark:text-slate-50";
  const subtitleClass =
    "text-center text-sm text-slate-600 dark:text-slate-300 mb-6";

  const sectionWrapperClass =
    "border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm";
  const sectionHeaderBarClass =
    "px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border-b border-gray-200 dark:border-slate-700";
  const sectionHeaderTextClass =
    "text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-100 uppercase";
  const sectionBodyGridClass =
    "p-3 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-3";

  const submitButtonClass =
    "w-full max-w-sm flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <section className={pageSectionClass}>
      <div className={cardClass}>
      <Breadcrumb />
        <h1 className={titleClass}>{text.title}</h1>
        {text.subtitle && (
          <p className={subtitleClass}>{text.subtitle}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-slate-800 dark:text-slate-100">
          {/* 1. Data Pelanggan */}
          <div className={sectionWrapperClass}>
            <div className={sectionHeaderBarClass}>
              <div className={sectionHeaderTextClass}>{sections.customer}</div>
            </div>
            <div className={sectionBodyGridClass}>
              <div className="md:col-span-4">
                <FormItem
                  label={labels.nama}
                  name="nama"
                  type="text"
                  formData={formData}
                  handler={handleChange}
                  required
                  placeholder={placeholders.nama}
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={labels.telepon}
                  name="telepon"
                  type="tel"
                  formData={formData}
                  handler={handleChange}
                  required
                  isNumeric
                  placeholder={placeholders.telepon}
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={labels.email}
                  name="email"
                  type="email"
                  formData={formData}
                  handler={handleChange}
                  required
                  placeholder={placeholders.email}
                />
              </div>

              <div className="md:col-span-4">
                <FormItem
                  label={labels.alamat}
                  name="alamat"
                  type="textarea"
                  formData={formData}
                  handler={handleChange}
                  required
                  rows={3}
                  placeholder={placeholders.alamat}
                />
              </div>
            </div>
          </div>

          {/* 2. Profil Unit */}
          <div className={sectionWrapperClass}>
            <div className={sectionHeaderBarClass}>
              <div className={sectionHeaderTextClass}>{sections.vehicle}</div>
            </div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <FormItem
                label={labels.jenisMobil}
                name="jenisMobil"
                type="select"
                formData={formData}
                handler={handleChange}
                required
                options={options.jenisMobil}
              />
              <FormItem
                label={labels.tahunMobil}
                name="tahunMobil"
                type="select"
                formData={formData}
                handler={handleChange}
                required
                options={options.tahunMobil}
              />
              <FormItem
                label={labels.nomorPolisi}
                name="nomorPolisi"
                type="text"
                formData={formData}
                handler={handleChange}
                required
                placeholder={placeholders.nomorPolisi}
              />
            </div>
          </div>

          {/* 3. Data Layanan */}
          <div className={sectionWrapperClass}>
            <div className={sectionHeaderBarClass}>
              <div className={sectionHeaderTextClass}>{sections.service}</div>
            </div>
            <div className={sectionBodyGridClass}>
              <div className="md:col-span-2">
                <FormItem
                  label={labels.provinsi}
                  name="provinsi"
                  type="select"
                  formData={formData}
                  handler={handleChange}
                  required
                  options={options.provinsi}
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={labels.bengkel}
                  name="bengkel"
                  type="select"
                  formData={formData}
                  handler={handleChange}
                  required
                  options={options.bengkel}
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={labels.jenisService}
                  name="jenisService"
                  type="select"
                  formData={formData}
                  handler={handleChange}
                  required
                  options={options.jenisService}
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={labels.tanggalBooking}
                  name="tanggalBooking"
                  type="date"
                  formData={formData}
                  handler={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <FormItem
                  label={labels.jamBooking}
                  name="jamBooking"
                  type="select"
                  formData={formData}
                  handler={handleChange}
                  required
                  options={options.jamBooking}
                />
              </div>

              <div className="md:col-span-4">
                <FormItem
                  label={labels.keluhan}
                  name="keluhan"
                  type="textarea"
                  formData={formData}
                  handler={handleChange}
                  required
                  rows={3}
                  placeholder={placeholders.keluhan}
                />
              </div>
            </div>
          </div>

          {/* Captcha + Submit */}
          <div className="flex flex-col items-center pt-2">
            <div className="flex items-center space-x-2 border border-slate-300 dark:border-slate-700 p-3 w-max rounded-md bg-gray-50 dark:bg-slate-900 shadow-inner mb-6">
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
                {labels.captcha}
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-4">
                {labels.captchaTag}
              </span>
            </div>

            <button
              type="submit"
              disabled={formData.loading}
              className={submitButtonClass}
            >
              {labels.submit}
            </button>
          </div>
        </form>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-4 block text-center">{text.disclaimer}</span>
      </div>
    </section>
  );
}