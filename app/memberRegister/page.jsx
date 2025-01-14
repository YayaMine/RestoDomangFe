"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi halaman
import Swal from "sweetalert2";
import { useRegister } from "@/hooks/useRegister"; // Gunakan hook useRegister
import Image from "next/image";

const RegisterPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();
    const { register, errors } = useRegister(); // Gunakan fungsi register dari useRegister

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi form
        if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Semua kolom harus diisi!",
            });
            return;
        }

        if (form.password !== form.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password dan Konfirmasi Password tidak sama!",
            });
            return;
        }

        try {
            await register({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password.trim(),
                password_confirmation: form.confirmPassword.trim(), // Sesuaikan dengan backend
            });

            Swal.fire({
                icon: "success",
                title: "Registrasi Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });

            router.replace("/member"); // Redirect ke halaman login setelah berhasil registrasi
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: "Terjadi kesalahan. Coba lagi!",
            });
        }
    };
    const handleHome = () => {
        router.push("/#Hero"); // Arahkan user ke halaman hero
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="flex w-3/4 max-w-5xl overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center w-1/2 p-12 bg-white">
                    <Image
                        src="/newlogo.png"
                        alt="Logo"
                        width={300}
                        height={300}
                        className="mb-4"
                    />
                    <h2 className="mt-6 text-3xl font-bold">Daftar Akun</h2>
                    <p className="mt-2 text-gray-600">Buat akun baru Anda</p>
                    <button
                        onClick={handleHome}
                        className="mt-6 bg-[#C06014] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#AD4C10] transition duration-300"
                    >
                        HOME
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 p-12 text-white bg-gray-700">
                    <h2 className="mb-4 text-3xl font-bold">Register</h2>
                    <div className="p-8 text-black bg-white rounded-lg shadow-lg w-96">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errors && errors.length > 0 && (
                                <div>
                                    {errors.map((error, index) => (
                                        <p key={index} style={{ color: "red" }}>
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            )}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Nama</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                                    placeholder="Nama"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                                    placeholder="Konfirmasi Password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#C06014] text-white font-semibold rounded-lg hover:bg-[#AD4C10] transition duration-200"
                            >
                                REGISTER
                            </button>
                        </form>
                        {/* Tambahkan tombol kembali ke login */}
                        <div className="my-4"></div>
                        <button
                            onClick={() => router.push("/member")}
                            className="w-full py-3 font-semibold text-white transition duration-200 bg-gray-400 rounded-lg hover:bg-gray-500"
                        >
                            Kembali ke Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
