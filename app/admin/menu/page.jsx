"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, List, Calendar, User, LogOut, Trash, Edit } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMenu } from "@/hooks/useMenu";
import Swal from "sweetalert2";

const MenusPage = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  const { menus, createMenu, updateMenu, deleteMenu } = useMenu();

  const [newMenu, setNewMenu] = useState({
    nama_menu: "",
    kategori_menu: "makanan",
    harga_menu: "",
    deskripsi: "",
  });
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (selectedMenu) {
      setNewMenu({
        nama_menu: selectedMenu.nama_menu,
        kategori_menu: selectedMenu.kategori_menu,
        harga_menu: selectedMenu.harga_menu,
        deskripsi: selectedMenu.deskripsi,
      });
      setPreview(`http://localhost:8000/storage/${selectedMenu.foto_menu}`);
    }
  }, [selectedMenu]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreateOrUpdateMenu = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_menu", newMenu.nama_menu);
    formData.append("kategori_menu", newMenu.kategori_menu);
    formData.append("harga_menu", newMenu.harga_menu);
    formData.append("deskripsi", newMenu.deskripsi);

    if (image) {
      formData.append("foto_menu", image);
    }

    try {
      if (selectedMenu) {
        await updateMenu(selectedMenu.id, formData);
        Swal.fire({
          title: "Success",
          text: "Menu berhasil diperbarui.",
          icon: "success",
        });
      } else {
        await createMenu(formData);
        Swal.fire({
          title: "Success",
          text: "Menu berhasil ditambahkan.",
          icon: "success",
        });
      }
      resetForm();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Gagal menyimpan menu.",
        icon: "error",
      });
    }
  };

  const handleDeleteMenu = (id) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus menu ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMenu(id);
          Swal.fire({
            title: "Success",
            text: "Menu berhasil dihapus.",
            icon: "success",
          });
        } catch (err) {
          Swal.fire({
            title: "Error",
            text: "Gagal menghapus menu.",
            icon: "error",
          });
        }
      }
    });
  };

  const resetForm = () => {
    setNewMenu({
      nama_menu: "",
      kategori_menu: "makanan",
      harga_menu: "",
      deskripsi: "",
    });
    setImage(null);
    setPreview("");
    setSelectedMenu(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/menu"
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md"
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
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-700">Manage Menus</h2>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>

        {/* Form Section */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-700">
            {selectedMenu ? "Edit Menu" : "Tambah Menu"}
          </h2>
          <form onSubmit={handleCreateOrUpdateMenu} className="space-y-4">
            <div>
              <label
                htmlFor="nama_menu"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Menu
              </label>
              <input
                type="text"
                id="nama_menu"
                name="nama_menu"
                value={newMenu.nama_menu}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="kategori_menu"
                className="block text-sm font-medium text-gray-700"
              >
                Kategori Menu
              </label>
              <select
                id="kategori_menu"
                name="kategori_menu"
                value={newMenu.kategori_menu}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="paket">Paket</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="harga_menu"
                className="block text-sm font-medium text-gray-700"
              >
                Harga Menu
              </label>
              <input
                type="number"
                id="harga_menu"
                name="harga_menu"
                value={newMenu.harga_menu}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={newMenu.deskripsi}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                rows="3"
              />
            </div>
            <div>
              <label
                htmlFor="foto_menu"
                className="block text-sm font-medium text-gray-700"
              >
                Foto Menu
              </label>
              <input
                type="file"
                id="foto_menu"
                name="foto_menu"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
              />
              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-orange-500 rounded-md"
              >
                {selectedMenu ? "Update Menu" : "Tambah Menu"}
              </button>
              {selectedMenu && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-white bg-gray-400 rounded-md"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Table Section */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-700">Daftar Menu</h2>
          <table className="w-full bg-white rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Gambar</th>
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Kategori</th>
                <th className="px-4 py-2 text-left">Harga</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menus?.map((menu) => (
                <tr key={menu.id}>
                  <td className="px-4 py-2 border-b">
                    <Image
                      src={`http://localhost:8000/storage/${menu.foto_menu}`}
                      alt={menu.nama_menu}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{menu.nama_menu}</td>
                  <td className="px-4 py-2 border-b">{menu.kategori_menu}</td>
                  <td className="px-4 py-2 border-b">Rp {menu.harga_menu}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => setSelectedMenu(menu)}
                      className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md"
                    >
                      <Edit className="inline w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(menu.id)}
                      className="px-2 py-1 ml-2 text-sm text-white bg-red-500 rounded-md"
                    >
                      <Trash className="inline w-4 h-4" /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default MenusPage;
