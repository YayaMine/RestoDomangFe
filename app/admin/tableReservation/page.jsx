"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Menu, Calendar, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const TableReservationPage = () => {
  const { user, logout } = useAuth({ middleware: "auth" });

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-sm">
        <div className="p-6 text-center border-b">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <Image
              src="/logo.svg"
              alt="Domang Sushi"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl font-bold text-orange-600">DOMANG SUSHI</h1>
        </div>
        <nav className="p-4">
          <Link
            href="/admin"
            className="flex items-center px-4 py-2 mb-2 text-gray-700 rounded-lg hover:bg-orange-50"
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/admin/menu"
            className="flex items-center px-4 py-2 mb-2 text-gray-700 rounded-lg hover:bg-orange-50"
          >
            <Menu className="w-5 h-5 mr-3" />
            Menus
          </Link>
          <div className="relative">
            <Link
              href="/admin/reservasi"
              className="flex items-center px-4 py-2 mb-2 text-gray-700 bg-orange-100 rounded-lg"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Reservation
            </Link>
            <button className="w-full px-8 py-2 mb-1 text-sm text-left text-orange-700 rounded-lg bg-orange-50">
              Table
            </button>
          </div>
          <Link
            href="/admin/user"
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50"
          >
            <User className="w-5 h-5 mr-3" />
            Users
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 mt-4 text-gray-700 rounded-lg hover:bg-orange-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reservation</h1>
            <p className="text-sm text-gray-500">Check member reservation</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        <div className="p-6 bg-white shadow-sm rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Table Reservation</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Tanggal</th>
                  <th className="px-4 py-3 text-left">No.Telepon</th>
                  <th className="px-4 py-3 text-left">Jumlah Orang</th>
                  <th className="px-4 py-3 text-left">Jumlah Meja</th>
                  <th className="px-4 py-3 text-left">Letak Meja</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">23 August 2023</td>
                  <td className="px-4 py-3 text-blue-600 underline">
                    08531934521
                  </td>
                  <td className="px-4 py-3">3 orang</td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3">Indoor</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              <button className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                Edit Table
              </button>
              <button className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700">
                Tambah Table
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-orange-600 rounded-lg hover:bg-orange-50">
                Previous
              </button>
              <button className="px-4 py-2 text-white bg-orange-600 rounded-lg">
                1
              </button>
              <button className="px-4 py-2 text-orange-600 rounded-lg hover:bg-orange-50">
                2
              </button>
              <button className="px-4 py-2 text-orange-600 rounded-lg hover:bg-orange-50">
                3
              </button>
              <button className="px-4 py-2 text-orange-600 rounded-lg hover:bg-orange-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TableReservationPage;
