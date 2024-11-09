import Link from 'next/link';
import React from 'react';

export default function Location() {
  return (
    <section id="location" className="bg-[#262222] flex items-center justify-between py-16 px-8 space-x-8 w-full">
      {/* Map Placeholder */}
      <div className="w-1/3 h-96 ml-48 bg-gray-200 rounded-lg">
        {/* Tempat mapnya */}
      </div>

      <div className="w-1/2">
        <h2 className="text-xl font-bold text-white mb-4">Cabang Ungasan</h2>
        <p className="text-lg text-[#C06014] mb-2">
          Jl. Kampus Bukit, Jimbaran, South Kuta, Bali
        </p>
        <p className="text-white mb-6">
          Restoran ini terletak di Penta Garden, menawarkan suasana yang Kejam dan Sadis untuk berkumpul bersama Geng Anda. Nikmati berbagai menu khas kami dalam suasana yang Agak Agak dan Wangi yang Ngas sedikit.
        </p>
        <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-[#C06014] transition-colors duration-300 flex items-center mx-1">
          Buka di Google Map
          <span className="ml-2"></span>
        </button>
      </div>
    </section>
  );
}
