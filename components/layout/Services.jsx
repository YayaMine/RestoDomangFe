import React from 'react';
import Image from 'next/image';

const Services = () => {
  return (
    <div className="bg-[#262222] py-16 px-4 rounded-sm" id="services">
      <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 flex flex-col">
          <Image
            src="/sushitest.png"
            alt="Delivery Service"
            width={600}
            height={800}
            className="w-full h-auto rounded-lg mb-4"
          />
          <div className="space-y-4 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-white">Booking Table Service</h2>
            <p className="text-gray-300 flex-grow">
            Pesan Meja Sekarang, Nikmati Makan Tanpa Khawatir!
            Cukup pilih waktu dan jumlah orang, dan kami akan memastikan meja Anda siap saat Anda tiba. Rasakan pengalaman makan yang lebih santai dengan layanan reservasi kami.
            </p>
            <button className="bg-white text-[#262222] font-semibold py-2 px-6 rounded-full hover:bg-[#C06014] hover:text-white transition-colors duration-300 self-start">
              ORDER
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <Image
            src="/sushitest.png"
            alt="Catering Service"
            width={600}
            height={800}
            className="w-full h-auto rounded-lg mb-4"
          />
          <div className="space-y-4 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-white">Booking Event Service</h2>
            <p className="text-gray-300 flex-grow">
            Buat Acara Anda Tak Terlupakan dengan Layanan Pemesanan Acara Kami!
            Apakah Anda merencanakan pesta pribadi, acara korporat, atau perayaan spesial? Kami siap membantu Anda mengatur acara yang luar biasa.
            </p>
            <button className="bg-white text-[#262222] font-semibold py-2 px-6 rounded-full hover:bg-[#C06014] hover:text-white transition-colors duration-300 self-start">
              ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;