"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Menu, Calendar, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const UserManagementPage = () => {
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
          <Link
            href="/admin/reservasi"
            className="flex items-center px-4 py-2 mb-2 text-gray-700 rounded-lg hover:bg-orange-50"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Reservation
          </Link>
          <Link
            href="/admin/tableReservation"
            className="flex items-center px-4 py-2 mb-2 text-gray-700 rounded-lg hover:bg-orange-50"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Table
          </Link>
          <Link
            href="/admin/user"
            className="flex items-center px-4 py-2 text-white bg-orange-600 rounded-lg"
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
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome to Domang Sushi Admin!</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        <section className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">User</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Password</th>
                  <th className="px-4 py-3 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Rajarandes@gmail.com</td>
                  <td className="px-4 py-3">DenaiCanztik</td>
                  <td className="px-4 py-3">Di**********</td>
                  <td className="px-4 py-3">26 March 2020, 12:42 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="p-6 bg-white shadow-sm rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Admin</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Password</th>
                  <th className="px-4 py-3 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Rajarandes@gmail.com</td>
                  <td className="px-4 py-3">DenaiCanztik</td>
                  <td className="px-4 py-3">Di**********</td>
                  <td className="px-4 py-3">26 March 2020, 12:42 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserManagementPage;
