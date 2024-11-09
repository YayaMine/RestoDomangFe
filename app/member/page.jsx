"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function MemberPage() {
    return (
        <div className="flex min-h-screen">
            {/* Bagian kiri dengan logo */}
            <div className="w-1/2 bg-white flex flex-col justify-center items-center">
                <Image src="/logo.svg" alt="Domang Sushi Logo" width={192} height={192} />
                <h1 className="text-base font-bold">
              <span style={{ color: "#FF7100" }}>DOMANG</span>{" "}
              <span className="text-black">SUSHI</span>
            </h1>
            </div>

            {/* Bagian kanan dengan form login */}
            <div className="w-1/2 bg-[#3D3D3D] flex flex-col justify-center items-center text-white p-8">
                <h2 className="text-3xl font-bold mb-2">SELAMAT DATANG</h2>
                <p className="mb-8 text-gray-300">Silahkan Login Terlebih dahulu</p>

                <form className="w-3/4">
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-black rounded-lg bg-[#D9C5B2] text-black"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 font-semibold">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-black rounded-lg bg-[#D9C5B2] text-black"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#C06014] text-white font-semibold rounded-lg hover:bg-[#AD4C10]"
                    >
                        Masuk
                    </button>
                </form>

                <p className="mt-8 text-gray-300">
    Belum punya akun?{" "}
    <Link href="/memberRegister" className="font-semibold text-white hover:underline">
        Buat akun
    </Link>
</p>

            </div>
        </div>
    );
}
