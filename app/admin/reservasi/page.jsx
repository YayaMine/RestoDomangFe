"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, List, Calendar, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useReservasi } from "@/hooks/useReservasi";
import Swal from "sweetalert2";

const ReservationPage = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  const { reservasi, meja, error, createReservasi } = useReservasi();
  const [formData, setFormData] = useState({
    meja_id: "",
    nomor_telepon: "",
    tanggal_reservasi: "",
    jam_reservasi: "",
    jumlah_orang: "",
  });
  const [errors, setErrors] = useState([]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateReservasi = async () => {
    setErrors([]);

    const dataToSend = {
      ...formData,
      user_id: user.id,
    };

    if (
      !dataToSend.meja_id ||
      !dataToSend.nomor_telepon ||
      !dataToSend.tanggal_reservasi ||
      !dataToSend.jam_reservasi ||
      !dataToSend.jumlah_orang
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Input",
        text: "Please fill all required fields.",
      });
      return;
    }

    try {
      await createReservasi(dataToSend);
      setFormData({
        meja_id: "",
        nomor_telepon: "",
        tanggal_reservasi: "",
        jam_reservasi: "",
        jumlah_orang: "",
      });
      Swal.fire({
        icon: "success",
        title: "Reservation Created!",
        text: "New reservation has been created successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to create reservation. Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-center border-b">
          <Image
            src="/logo.svg"
            alt="Domang Sushi"
            width={64}
            height={64}
            className="mx-auto mb-2"
          />
          <h1 className="text-xl font-bold text-gray-700">DOMANG SUSHI</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/menu"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <List className="w-5 h-5 mr-2" />
                Menus
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/reservasi"
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md py-2px-4"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reservation
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/tableReservation"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Table
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/admin/user"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <User className="w-5 h-5 mr-2" />
                User
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reservation</h1>
            <p className="text-sm text-gray-500">Check and create reservations</p>
          </div>
          <div>
            <p className="text-gray-600">{user.name}</p>
            <span className="text-sm text-gray-400">{user.role}</span>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="mb-4 text-xl font-bold text-gray-700">Create Reservation</h2>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <select
              name="meja_id"
              value={formData.meja_id}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="">Select Table</option>
              {meja?.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.nomor_meja} - {table.jumlah_orang} Orang
                </option>
              ))}
            </select>
            <input
              type="text"
              name="nomor_telepon"
              placeholder="Customer Contact"
              value={formData.nomor_telepon}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="tanggal_reservasi"
              value={formData.tanggal_reservasi}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="time"
              name="jam_reservasi"
              value={formData.jam_reservasi}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="jumlah_orang"
              placeholder="Number of People"
              value={formData.jumlah_orang}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </form>
          <button
            onClick={handleCreateReservasi}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          >
            Create Reservation
          </button>
          {errors.length > 0 && (
            <div className="mt-4 text-red-500">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-700">All Reservations</h2>
          {error ? (
            <p className="text-red-500">Failed to load reservations.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-md shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Contact</th>
                    <th className="px-4 py-2 text-left">Table Number</th>
                    <th className="px-4 py-2 text-left">Jumlah Orang</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasi?.length > 0 ? (
                    reservasi.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 border-b">{item.user?.name || "Anonymous"}</td>
                        <td className="px-4 py-2 border-b">{item.nomor_telepon}</td>
                        <td className="px-4 py-2 border-b">{item.meja?.nomor_meja || "N/A"}</td>
                        <td className="px-4 py-2 border-b">{item.jumlah_orang || "N/A"}</td>
                        <td className="px-4 py-2 border-b">{item.tanggal_reservasi}</td>
                        <td className="px-4 py-2 border-b">{item.jam_reservasi}</td>
                        <td className="px-4 py-2 border-b">
                          <span
                            className={`inline-block px-2 py-1 text-sm rounded ${
                              item.status === "paid"
                                ? "bg-green-500 text-white"
                                : item.status === "pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center">
                        No reservations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReservationPage;
