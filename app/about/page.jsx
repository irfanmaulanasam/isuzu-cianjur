// src/app/about/page.jsx
import {about} from '@/data/about'
import { Truck, Target, Lightbulb, CheckCircle } from 'lucide-react';
export const metadata = {
title: about.title,
description: about.description
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {about.title}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-lg text-gray-700 leading-relaxed">
          {about.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8">
          
          {/* Visi Card */}
          <div className="border-l-4 border-yellow-500 pl-6 shadow-md p-6 rounded-lg bg-yellow-50">
            <Target className="w-8 h-8 text-yellow-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-yellow-700">Visi Kami</h2>
            <p className="text-xl text-gray-800 italic">
              {about.vision}
            </p>
          </div>
          
          {/* Misi List */}
          <div className="shadow-md p-6 rounded-lg border-t-4 border-blue-500 bg-blue-50">
            <Lightbulb className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Misi Kami</h2>
            <ul className="space-y-3">
              {about.mission.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
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
          <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-800">
            Nilai-Nilai Inti Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {about.values.map((value, index) => (
              <div 
                key={index} 
                className="text-center p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white"
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-blue-100 text-blue-600">
                    {/* Menggunakan ikon yang berbeda untuk variasi */}
                    {index === 0 && <Truck className="w-6 h-6" />}
                    {index === 1 && <CheckCircle className="w-6 h-6" />}
                    {index === 2 && <Target className="w-6 h-6" />}
                    {index === 3 && <Lightbulb className="w-6 h-6" />}
                    {index === 4 && <div className="w-6 h-6 text-xl">🤝</div>}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.name}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}