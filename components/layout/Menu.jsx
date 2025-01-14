"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MenuItem from './MenuItem';
import Link from 'next/link';
import { useMenu } from '@/hooks/useMenu'; // Pastikan hooks sudah diimplementasikan

export default function Menu() {
  const { menus, error } = useMenu(); // Mengambil data dari hooks
  const [popularMenus, setPopularMenus] = useState([]);

  useEffect(() => {
    if (menus) {
      // Ambil hanya 4 menu pertama
      setPopularMenus(menus.slice(0, 4));
    }
  }, [menus]);

  if (error) {
    return <p className="text-center text-red-500">Gagal memuat menu. Silakan coba lagi nanti.</p>;
  }

  return (
    <section id="menu" className="py-20">
      <div className="flex flex-col items-center max-w-6xl gap-8 px-4 mx-auto mb-12 md:flex-row">
        <div className="relative w-full h-64 md:w-1/2 md:h-80">
          <Image
            src="/menusushi.svg"
            alt="Sushi Dish"
            layout="fill"
            className="object-contain rounded-lg"
            priority
          />
        </div>
        <div className="hidden border-l-4 border-black md:block h-80"></div>
        <div className="text-center md:w-1/2 md:text-left">
          <h1 className="mb-4 text-3xl font-bold">
            Sensasi Sushi dengan Sentuhan Bali di <span className="text-[#FF7100]">Domang Sushi</span>
          </h1>
          <p className="mb-6 text-base text-gray-700">
            Domang Sushi Bali menyajikan sushi autentik dengan sentuhan khas Bali, menggunakan bahan segar berkualitas tinggi untuk menghadirkan cita rasa Jepang yang otentik di tengah keindahan pulau dewata.
          </p>
          <Link href="/menu" className="bg-[#FF7100] text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-orange-500">
            Lihat Menu
          </Link>
        </div>
      </div>

      <section id="menu" className="py-20">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-left">MENU POPULER</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {popularMenus.length > 0 ? (
              popularMenus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  name={menu.nama_menu}
                  price={menu.harga_menu}
                  imageSrc={`http://localhost:8000/storage/${menu.foto_menu}`}
                />
              ))
            ) : (
              <p className="col-span-4 text-center">Tidak ada menu yang tersedia saat ini.</p>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
