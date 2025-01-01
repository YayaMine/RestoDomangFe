"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, List, Calendar, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const MenusPage = () => {
  const { user, logout } = useAuth({ middleware: "auth" });

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await logout();
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
          <h1 className="text-xl font-bold text-orange-600">DOMANG SUSHI</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md"
              >
                <List className="w-5 h-5 mr-2" />
                Menus
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reservasi"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reservation
              </Link>
            </li>
            <li>
              <Link
                href="/admin/tableReservation"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Table
              </Link>
            </li>
            <li>
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
                className="flex items-center w-full px-4 py-2 mt-4 text-gray-700 rounded-md hover:bg-orange-100"
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
          <h1 className="text-2xl font-bold text-gray-800">Menus</h1>
          <div>
            <p className="text-gray-600">{user.name}</p>
            <span className="text-sm text-gray-400">{user.role}</span>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="mb-4 text-xl font-bold text-gray-700">All Menu</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Gambar</th>
                  <th className="px-4 py-2 text-left">Nama Menu</th>
                  <th className="px-4 py-2 text-left">Deskripsi</th>
                  <th className="px-4 py-2 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">
                    <Image
                      src="/menu-image.png"
                      alt="Menu Item"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">DenaiCanztik</td>
                  <td className="px-4 py-2 border-b">Makanan terfavorit 2022</td>
                  <td className="px-4 py-2 border-b">
                    26 March 2020, 12:42 AM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Edit Menu</button>
          <button className="px-4 py-2 text-white bg-orange-500 rounded-md">
            Tambah Menu
          </button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Previous</button>
          <div>
            <button className="px-3 py-1 mx-1 text-white bg-orange-500 rounded-full">
              1
            </button>
            <button className="px-3 py-1 mx-1 bg-gray-200 rounded-full">
              2
            </button>
            <button className="px-3 py-1 mx-1 bg-gray-200 rounded-full">
              3
            </button>
          </div>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Next</button>
        </div>
      </main>
    </div>
  );
};

export default MenusPage;
