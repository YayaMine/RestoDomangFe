"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

const Services = () => {
  const { user } = useAuth(); // Cek status login
  const router = useRouter(); // Untuk navigasi halaman

  const handleReservation = (path) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "You need to log in before accessing this service.",
        confirmButtonText: "Login",
        confirmButtonColor: "#C06014",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/member"); // Arahkan ke halaman login
        }
      });
    } else {
      router.push(path); // Arahkan ke halaman sesuai path
    }
  };

  return (
    <div className="px-4 py-16 bg-white rounded-sm" id="services">
      <div className="flex flex-col items-start justify-between max-w-6xl mx-auto space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        <div className="flex flex-col w-full md:w-1/2">
          <Image
            src="/sushitest.png"
            alt="Booking Table Service"
            width={600}
            height={800}
            className="w-full h-auto mb-4 rounded-lg"
          />
          <div className="flex flex-col flex-grow space-y-4">
            <h2 className="text-xl font-bold text-black">Booking Table Service</h2>
            <p className="flex-grow text-black">
              Pesan Meja Sekarang, Nikmati Makan Tanpa Khawatir! Cukup pilih waktu dan jumlah orang, dan kami akan memastikan meja Anda siap saat Anda tiba. Rasakan pengalaman makan yang lebih santai dengan layanan reservasi kami.
            </p>
            <button
              onClick={() => handleReservation("/userReservasi")}
              className="bg-black text-white font-semibold py-2 px-6 rounded-full hover:bg-[#C06014] hover:text-white transition-colors duration-300 self-start"
            >
              ORDER
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <Image
            src="/sushitest.png"
            alt="Booking Event Service"
            width={600}
            height={800}
            className="w-full h-auto mb-4 rounded-lg"
          />
          <div className="flex flex-col flex-grow space-y-4">
            <h2 className="text-xl font-bold text-black">Booking Event Service</h2>
            <p className="flex-grow text-black">
              Buat Acara Anda Tak Terlupakan dengan Layanan Pemesanan Acara Kami! Apakah Anda merencanakan pesta pribadi, acara korporat, atau perayaan spesial? Kami siap membantu Anda mengatur acara yang luar biasa.
            </p>
            <button
              onClick={() => handleReservation("/eventReservasi")}
              className="bg-black text-white font-semibold py-2 px-6 rounded-full hover:bg-[#C06014] hover:text-white transition-colors duration-300 self-start"
            >
              ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
