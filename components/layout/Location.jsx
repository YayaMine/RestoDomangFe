import Link from 'next/link';
import React from 'react';

export default function Location() {
  return (
    <section id="location" className="bg-[#262222] py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-8 md:flex-row md:items-center md:justify-between md:space-x-8 md:space-y-0">
          <div className="w-full h-64 mx-auto bg-gray-200 rounded-lg md:w-1/2 lg:w-1/3 md:h-96 md:mx-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.865627039884!2d115.16241707457064!3d-8.798639689955027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd244c13ee9d753%3A0x6c05042449b50f81!2sPoliteknik%20Negeri%20Bali!5e0!3m2!1sid!2sid!4v1736059699969!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-xl">
              Cabang Ungasan
            </h2>
            <p className="text-base md:text-lg text-[#C06014] mb-2">
              Jl. Kampus Bukit, Jimbaran, South Kuta, Bali
            </p>
            <p className="mb-6 text-sm text-white md:text-base">
              Restoran ini terletak di Penta Garden, menawarkan suasana yang Kejam dan Sadis 
              untuk berkumpul bersama Geng Anda. Nikmati berbagai menu khas kami dalam suasana 
              yang Agak Agak dan Wangi yang Ngas sedikit.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                href="https://www.google.com/maps/search/?api=1&query=-8.798639,115.162417"
                passHref
              >
                <button
                  className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-[#C06014] hover:text-white transition-colors duration-300 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka di Google Map
                  <span className="ml-2"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
