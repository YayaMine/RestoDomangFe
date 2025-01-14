"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useReservasi } from "@/hooks/useReservasi";
import { useAuth } from "@/hooks/useAuth";

const ReservationPage = () => {
  const router = useRouter();
  const { fetchAvailableTables, createReservasiWithPayment } = useReservasi();
  const { user } = useAuth();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    telp: "",
    jumlah_orang: "",
    meja_id: "",
    tanggal: "",
    waktu: "",
  });
  const [availableTables, setAvailableTables] = useState([]);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        telp: user.phone || "",
      }));
    }

    // Load Midtrans Snap.js
    if (typeof window !== "undefined" && typeof window.snap === "undefined") {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "SB-Mid-client-XEErIiChOLTLxMlj");
      script.async = true;
      script.onerror = () => {
        Swal.fire({
          title: "Error",
          text: "Gagal memuat Midtrans Snap.js. Silakan coba lagi.",
          icon: "error",
        });
      };
      document.body.appendChild(script);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "jumlah_orang" && value) {
      fetchAvailableTables(value)
        .then((tables) => setAvailableTables(tables))
        .catch(() => setAvailableTables([]));
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!formData.telp || !formData.jumlah_orang || !formData.meja_id || !formData.tanggal || !formData.waktu) {
      Swal.fire({
        title: "Error",
        text: "Mohon lengkapi semua data sebelum melanjutkan.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Konfirmasi Reservasi",
      text: "Apakah Anda yakin ingin melanjutkan reservasi?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const snapToken = await createReservasiWithPayment({
            user_id: user?.id,
            nomor_telepon: formData.telp,
            jumlah_orang: formData.jumlah_orang,
            meja_id: formData.meja_id,
            tanggal_reservasi: formData.tanggal,
            jam_reservasi: formData.waktu,
          });

          if (snapToken) {
            window.snap.pay(snapToken, {
              onSuccess: () => {
                Swal.fire({
                  title: "Pembayaran Berhasil",
                  text: "Reservasi Anda berhasil dibuat.",
                  icon: "success",
                }).then(() => {
                  router.push("/"); // Redirect to /home
                });
              },
              onPending: () => {
                Swal.fire({
                  title: "Pembayaran Ditunda",
                  text: "Pembayaran Anda sedang diproses. Silakan tunggu konfirmasi.",
                  icon: "info",
                });
              },
              onError: () => {
                Swal.fire({
                  title: "Pembayaran Gagal",
                  text: "Terjadi kesalahan saat memproses pembayaran.",
                  icon: "error",
                });
              },
              onClose: () => {
                Swal.fire({
                  title: "Pembayaran Ditutup",
                  text: "Anda belum menyelesaikan pembayaran.",
                  icon: "warning",
                });
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "Gagal membuat reservasi.",
            icon: "error",
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-75">
      <div className="absolute inset-0 z-0">
        <Image
          src="/sushi2.png"
          alt="Sushi Background"
          fill
          objectFit="cover"
          className="opacity-50 blur-md"
        />
      </div>
      <section className="relative z-10 bg-white shadow-lg p-6 sm:p-8 rounded-lg w-full sm:w-[90%] max-w-md">
        <h1 className="mb-6 text-xl font-bold text-center underline sm:text-2xl">
          Reservasi
        </h1>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label htmlFor="telp" className="block text-sm font-medium text-gray-700">
              Nomor Telepon (WhatsApp)
            </label>
            <input
              type="text"
              id="telp"
              name="telp"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Masukkan nomor WhatsApp"
              value={formData.telp}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="jumlah_orang" className="block text-sm font-medium text-gray-700">
              Jumlah Orang
            </label>
            <input
              type="number"
              id="jumlah_orang"
              name="jumlah_orang"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Masukkan jumlah orang"
              value={formData.jumlah_orang}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="meja_id" className="block text-sm font-medium text-gray-700">
              Nomor Meja
            </label>
            <select
              id="meja_id"
              name="meja_id"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={formData.meja_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih meja</option>
              {availableTables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.nomorMeja} ({table.jumlahOrang} Orang)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={formData.tanggal}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="waktu" className="block text-sm font-medium text-gray-700">
              Waktu
            </label>
            <input
              type="time"
              id="waktu"
              name="waktu"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={formData.waktu}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 text-white rounded-md ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Memproses..." : "Konfirmasi"}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full px-4 py-2 mt-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Kembali ke Home
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ReservationPage;
