"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2"; // Import Swal untuk validasi
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
    const { user, logout } = useAuth(); // Menggunakan hook useAuth

    const handleLogout = async () => {
        // Validasi konfirmasi logout
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from the system.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await logout(); // Logout menggunakan fungsi dari useAuth

                // Tampilkan notifikasi logout berhasil
                await Swal.fire({
                    icon: "success",
                    title: "Logged out successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Redirect ke halaman landing page
                window.location.href = "/"; // Redirect ke halaman utama
            } catch (error) {
                console.error("Logout error:", error);

                // Tampilkan notifikasi jika logout gagal
                await Swal.fire({
                    icon: "error",
                    title: "Logout failed!",
                    text: "Something went wrong. Please try again.",
                });
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 z-50 w-full text-sm bg-black shadow-md bg-opacity-80">
            <div className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
                <Link href="/">
                    <div className="flex items-center space-x-2">
                        <Image src="/newlogo.png" alt="Logo" width={60} height={64} />
                        <h1 className="text-base font-bold">
                            <span style={{ color: "#FF7100" }}>DOMANG</span>{" "}
                            <span className="text-white">SUSHI</span>
                        </h1>
                    </div>
                </Link>
                <nav className="flex-grow">
                    <ul className="flex justify-center space-x-6 text-white">
                        <li>
                            <a href="#hero" className="hover:text-[#C06014]">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#menu" className="hover:text-[#C06014]">
                                Menu
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-[#C06014]">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-[#C06014]">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#location" className="hover:text-[#C06014]">
                                Location
                            </a>
                        </li>
                    </ul>
                </nav>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="ml-auto bg-white text-[#C06014] py-2 px-6 rounded-full hover:bg-[#AD4C10] focus:outline-none text-base"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/member"
                        className="ml-auto bg-white text-[#C06014] py-2 px-6 rounded-full hover:bg-[#AD4C10] focus:outline-none text-base"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
