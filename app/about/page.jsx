'use client';
import { useMemo } from 'react';
import { useLanguage } from '@/src/context/languageContext';
import EN from '@/src/data/about/en.json'
import ID from '@/src/data/about/id.json'
import { Truck, Target, Lightbulb, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();

  const about = useMemo(() => {
    return language === 'en' ? EN : ID;
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white dark:text-white py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {about.title}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {about.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8">
          
          {/* Visi Card */}
          <div className="border-l-4 border-yellow-500 pl-6 shadow-md p-6 rounded-lg bg-yellow-50 dark:bg-yellow-900">
            <Target className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">{about.vision.title}</h2>
            <p className="text-xl text-gray-800 dark:text-gray-200 italic">
              {about.vision.value}
            </p>
          </div>
          
          {/* Misi List */}
          <div className="shadow-md p-6 rounded-lg border-t-4 border-blue-500 bg-blue-50 dark:bg-blue-900">
            <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-400">{about.mission.title}</h2>
            <ul className="space-y-3">
              {about.mission.value.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Nilai-Nilai (Values) Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-200">
            {about.sections.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
             {about.sections.items.map((value, index) => (
              <div 
                key={index} 
                className="text-center p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white dark:bg-gray-700"
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-blue-100 text-blue-600">
                    {index === 0 && <Truck className="w-6 h-6" />}
                    {index === 1 && <CheckCircle className="w-6 h-6" />}
                    {index === 2 && <Target className="w-6 h-6" />}
                    {index === 3 && <Lightbulb className="w-6 h-6" />}
                    {index === 4 && <div className="w-6 h-6 text-xl">🤝</div>}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}