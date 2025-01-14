"use client";

import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useMenu } from "@/hooks/useMenu";

const MenusPage = () => {
  const { menus, error } = useMenu(); // Ambil data menu dari hook
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const categories = ["Semua", "Makanan", "Minuman", "Paket"];

  useEffect(() => {
    // Filter menu berdasarkan kategori
    if (menus) {
      setFilteredMenus(
        selectedCategory === "Semua"
          ? menus
          : menus.filter((menu) => menu.kategori_menu === selectedCategory.toLowerCase())
      );
    }
  }, [menus, selectedCategory]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Gagal memuat menu. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen mt-20 bg-white">
        <header className="py-6 text-center border-b">
          <h1 className="text-4xl font-bold text-orange-500">Semua Menu</h1>
          <p className="mt-2 text-sm text-gray-500">
            Menu apa yang kamu inginkan hari ini?
          </p>
        </header>

        <div className="flex justify-center mt-6 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-semibold ${
                selectedCategory === category
                  ? "text-orange-500 border-b-4 border-orange-500"
                  : "text-gray-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={{
                  id: menu.id,
                  name: menu.nama_menu,
                  price: `Rp ${menu.harga_menu.toLocaleString()}`,
                  category: menu.kategori_menu,
                  description: menu.deskripsi,
                  image: `http://localhost:8000/storage/${menu.foto_menu}`,
                }}
              />
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              Tidak ada menu dalam kategori ini.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MenusPage;
