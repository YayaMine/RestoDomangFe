"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css"; 
    link.onload = () => {
      console.log("Ionicons CSS loaded");
    };
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section id="about" className="bg-[#262222] text-white py-20 mb-10 rounded-sm"> 
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#E6A069]">Tentang Domang Sushi</h2>
          <p className="mb-6">
            Domang Sushi lahir dari kecintaan kami terhadap cita rasa Jepang yang autentik,
            berpadu dengan pesona tradisi Bali. Terinspirasi oleh kekayaan budaya kedua tempat ini,
            kami memulai perjalanan kuliner kami untuk menghadirkan hidangan yang menggabungkan
            kesegaran bahan-bahan lokal dengan keahlian memasak Jepang. Dari sushi klasik hingga
            kreasi baru yang diperkaya rasa lokal, setiap sajian di Domang Sushi diciptakan dengan
            komitmen pada kualitas dan inovasi.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="https://instagram.com/domang_sushi" target="_blank" className="flex items-center space-x-2 bg-white text-[#262222] font-semibold py-2 px-4 rounded-full">
              <i className="ion-logo-instagram text-xl" style={{ color: "#E6A069" }}></i> 
              <span>@domang_sushi</span>
            </Link>
            <span className="text-white">|</span>
            <div className="flex items-center">
              <i className="ion-ios-call text-xl" style={{ color: "#E6A069" }}></i> 
              <p className="ml-2">+6281 353 987 347</p>
            </div>
          </div>
        </div>

        <div className="relative h-96">
          <Image
            src="/newlogo.png" 
            alt="Domang Sushi Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}