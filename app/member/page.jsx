"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi halaman
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth"; // Gunakan hook useAuth

const MemberPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState([]);
    const router = useRouter();
    const { user, login } = useAuth(); // Gunakan user dari useAuth

    // Redirect user jika sudah login
    useEffect(() => {
        if (user) {
            // Periksa role user dan redirect ke halaman yang sesuai
            if (user.role === "admin") {
                router.replace("/admin"); // Redirect ke halaman admin
            } else if (user.role === "member") {
                router.replace("/"); // Redirect ke halaman utama
            } else {
                console.error("Role not recognized: ", user.role);
                router.replace("/"); // Redirect ke halaman default
            }
        }
    }, [user, router]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Semua kolom harus diisi!",
            });
            return;
        }

        try {
            await login({
                email: form.email.trim(),
                password: form.password.trim(),
                setErrors,
            });

            Swal.fire({
                icon: "success",
                title: "Berhasil Login!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: error?.response?.data?.message || "Email atau password salah!",
            });

            setErrors(
                error?.response?.data?.errors
                    ? Object.values(error.response.data.errors).flat()
                    : ["Login gagal. Coba lagi."]
            );
        }
    };

    const handleRegister = () => {
        router.push("/memberRegister"); // Arahkan user ke halaman register
    };

    return user ? null : (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="flex w-3/4 max-w-5xl overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center w-1/2 p-12 bg-white">
                    <h2 className="mt-6 text-3xl font-bold">Selamat Datang</h2>
                    <p className="mt-2 text-gray-600">Silahkan Login Terlebih Dahulu</p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 p-12 text-white bg-gray-700">
                    <h2 className="mb-4 text-3xl font-bold">Sign In</h2>
                    <div className="p-8 text-black bg-white rounded-lg shadow-lg w-96">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errors.length > 0 && (
                                <div>
                                    {errors.map((error, index) => (
                                        <p key={index} style={{ color: "red" }}>
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            )}
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
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#C06014] text-white font-semibold rounded-lg hover:bg-[#AD4C10] transition duration-200"
                            >
                                SIGN IN
                            </button>
                        </form>
                        {/* Tambahkan jarak antara tombol SIGN IN dan REGISTER */}
                        <div className="my-4"></div>
                        <button
                            onClick={handleRegister}
                            className="w-full py-3 bg-[#C06014] text-white font-semibold rounded-lg hover:bg-[#AD4C10] transition duration-200"
                        >
                            REGISTER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberPage;
