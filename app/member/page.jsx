"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function MemberPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Semua kolom harus diisi!',
            });
            return;
        }
        // data palsu anjay dani slebew
        if (form.username === 'dani' && form.password === 'binjek') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Login!',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                if (isClient) {
                    window.location.href = '/';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: 'Username atau password salah!',
            });
        }
    };

    // buat render client side (hydration)
    if (!isClient) {
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-800">
            <div className="flex w-3/4 max-w-5xl overflow-hidden shadow-lg">
                
                <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
                    <Image src="/logo.svg" alt="Domang Sushi Logo" width={200} height={200} />
                    <h1 className="text-base font-bold mt-4">
                        <span style={{ color: "#FF7100" }}>DOMANG</span>{" "}
                        <span className="text-black">SUSHI</span>
                    </h1>
                    <h2 className="text-3xl font-bold mt-6">SELAMAT DATANG</h2>
                    <p className="mt-2 text-gray-600">Silahkan buat akun anda di sini</p>
                    <Link 
                        href="/memberRegister"
                        className="mt-8 px-10 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition duration-200"
                    >
                        SIGN UP
                    </Link>
                </div>

                <div className="w-1/2 bg-gray-700 flex flex-col justify-center items-center text-white p-12">
                    <h2 className="text-3xl font-bold mb-4">Sign In</h2>
                    <p className="mb-10 text-gray-300">Silahkan Login Terlebih Dahulu</p>

                    <div className="bg-white text-black w-96 p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C06014] bg-gray-100"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C06014] bg-gray-100"
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
                    </div>

                    <p className="mt-10 text-gray-300">Lupa password anda?</p>
                </div>
            </div>
        </div>
    );
}
