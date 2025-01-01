"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, List, Calendar, User, Users, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth({ middleware: "auth" });

  if (!user) {
    return <p>Loading...</p>;
  }

  // Contoh data tabel dinamis
  const members = [
    { email: "banajar@gmail.com", username: "Banajar", date: "26 March 2020" },
    { email: "denai@gmail.com", username: "Denai", date: "15 April 2021" },
  ];

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
          <h1 className="text-xl font-bold text-gray-700">DOMANG SUSHI</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md"
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
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
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
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div>
            <p className="text-gray-600">{user.name}</p>
            <span className="text-sm text-gray-400">{user.role}</span>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center justify-between p-4 text-white bg-orange-500 rounded-lg shadow-md">
            <div>
              <h2 className="text-3xl font-bold">40</h2>
              <p>Total Menus</p>
            </div>
            <List className="w-10 h-10" />
          </div>
          <div className="flex items-center justify-between p-4 text-white bg-orange-500 rounded-lg shadow-md">
            <div>
              <h2 className="text-3xl font-bold">120</h2>
              <p>Total Members</p>
            </div>
            <Users className="w-10 h-10" />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-700">Our Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{member.email}</td>
                    <td className="px-4 py-2 border-b">{member.username}</td>
                    <td className="px-4 py-2 border-b">{member.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

export default Dashboard;
