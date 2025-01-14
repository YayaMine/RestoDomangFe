"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, List, Calendar, User, LogOut } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { useMeja } from "@/hooks/useMeja";

const TableReservationPage = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  const { meja, createMeja, updateMeja, deleteMeja } = useMeja();
  const [formData, setFormData] = useState({
    jumlah_orang: "",
    nomor_meja: "",
    letak_meja: "",
    harga_meja: "",
  });
  const [editingMejaId, setEditingMejaId] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setErrors([]);
    try {
      if (editingMejaId) {
        await updateMeja(editingMejaId, { setErrors, ...formData });
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Table updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await createMeja({ setErrors, ...formData });
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Table created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setFormData({
        jumlah_orang: "",
        nomor_meja: "",
        letak_meja: "",
        harga_meja: "",
      });
      setEditingMejaId(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save table. Please try again.",
      });
    }
  };

  const handleEdit = (mejaItem) => {
    setEditingMejaId(mejaItem.id);
    setFormData({
      jumlah_orang: mejaItem.jumlah_orang,
      nomor_meja: mejaItem.nomor_meja,
      letak_meja: mejaItem.letak_meja,
      harga_meja: mejaItem.harga_meja,
    });
    Swal.fire({
      icon: "info",
      title: "Editing Table",
      text: `Editing table: ${mejaItem.nomor_meja}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMeja(id);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Table deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete table. Please try again.",
          });
        }
      }
    });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

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
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reservation
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/tableReservation"
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md py-2px-4"
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

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Table Reservation</h1>
            <p className="text-sm text-gray-500">Manage table reservations</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        <div className="p-6 bg-white shadow-sm rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Manage Tables</h2>

          <form className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3">
            <input
              type="number"
              name="jumlah_orang"
              placeholder="Jumlah Orang"
              value={formData.jumlah_orang}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="nomor_meja"
              placeholder="Nomor Meja"
              value={formData.nomor_meja}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="letak_meja"
              placeholder="Letak Meja"
              value={formData.letak_meja}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="harga_meja"
              placeholder="Harga Meja"
              value={formData.harga_meja}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </form>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            {editingMejaId ? "Update Table" : "Create Table"}
          </button>
          {errors.length > 0 && (
            <div className="mt-4 text-red-500">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 mt-6 bg-white shadow-sm rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Table List</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Nomor Meja</th>
                  <th className="px-4 py-2 text-left">Jumlah Orang</th>
                  <th className="px-4 py-2 text-left">Letak Meja</th>
                  <th className="px-4 py-2 text-left">Harga Meja</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meja?.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">{item.nomor_meja}</td>
                    <td className="px-4 py-2">{item.jumlah_orang}</td>
                    <td className="px-4 py-2">{item.letak_meja}</td>
                    <td className="px-4 py-2">{item.harga_meja}</td>
                    <td className="flex gap-2 px-4 py-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 text-white bg-green-500 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TableReservationPage;
