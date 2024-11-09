"use client";

import Swal from 'sweetalert2';
import { useState, } from 'react';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Semua kolom harus diisi!',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Akun berhasil dibuat!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      setIsSubmitted(true);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-md w-96">
        <h1 className="text-2xl font-bold text-white mb-4">SELAMAT DATANG</h1>
        <p className="text-gray-300 mb-6">Silahkan Login Terlebih Dahulu</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-gray-300 placeholder-gray-700 focus:outline-none"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-gray-300 placeholder-gray-700 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-gray-300 placeholder-gray-700 focus:outline-none"
          />
          {!isSubmitted ? (
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition"
            >
              Buat Akun
            </button>
          ) : (
            <Link href="/" className="block w-full text-center bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition">
              Pergi ke Home
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
