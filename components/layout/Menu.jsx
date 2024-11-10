import React from 'react';
import Image from 'next/image';
import MenuItem from './MenuItem';
import Link from 'next/link';

export default function Menu() {

  return (
    <section id="menu" className="py-20">
      <div className="max-w-6xl mx-auto px-4 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 relative h-64 md:h-80">
          <Image
            src="/menusushi.svg"
            alt="Sushi Dish"
            layout="fill"
            className="rounded-lg object-contain"
            priority
          />
        </div>
        <div className="hidden md:block h-80 border-l-4 border-black">
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">
            Sensasi Sushi dengan Sentuhan Bali di <span className="text-[#FF7100]">Domang Sushi</span>
          </h1>
          <p className="text-base text-gray-700 mb-6">
            Domang Sushi Bali menyajikan sushi autentik dengan sentuhan khas Bali, menggunakan bahan segar berkualitas tinggi untuk menghadirkan cita rasa Jepang yang otentik di tengah keindahan pulau dewata.
          </p>
          <Link href="/menu" className="bg-[#FF7100] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-orange-500">
            Lihat Menu
          </Link>
        </div>
      </div>

      <section id="menu" className="py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-left mb-12">MENU POPULER</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MenuItem 
          name="Salmon Nigiri" 
          price={35000} 
          imageSrc="/salmon-nigiri.png" 
        />
        <MenuItem 
          name="California Roll" 
          price={50000} 
          imageSrc="/api/placeholder/200/200" 
        />
        <MenuItem 
          name="Tuna Sashimi" 
          price={45000} 
          imageSrc="/api/placeholder/200/200" 
        />
        <MenuItem 
          name="Matcha Ice Cream" 
          price={25000} 
          imageSrc="/api/placeholder/200/200" 
        />
      </div>
    </div>
  </section>
    </section>
  );
}
