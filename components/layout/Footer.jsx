"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const smoothScroll = (e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-white text-black py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-black text-xl font-semibold mb-4">DOMANG SUSHI</h3>
                        <p className="text-gray-600">
                            Domang Sushi adalah salah satu restoran sushi terbaik yang ada di Gianyar yang sudah ada sejak tahun 2020. Domang adalah panggilan kecil dari owner Domang Sushi yang berasal dari Jembrana, Bali.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-black text-xl font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <a
                                    href="#about"
                                    onClick={(e) => smoothScroll(e, 'about')}
                                    className="hover:text-[#C06014] cursor-pointer"
                                >
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black text-xl font-semibold mb-4">Sushi</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <a
                                    href="#hero"
                                    onClick={(e) => smoothScroll(e, 'hero')}
                                    className="hover:text-[#C06014] cursor-pointer"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#menu"
                                    onClick={(e) => smoothScroll(e, 'menu')}
                                    className="hover:text-[#C06014] cursor-pointer"
                                >
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    onClick={(e) => smoothScroll(e, 'services')}
                                    className="hover:text-[#C06014] cursor-pointer"
                                >
                                    Our Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#location"
                                    onClick={(e) => smoothScroll(e, 'location')}
                                    className="hover:text-[#C06014] cursor-pointer"
                                >
                                    Location
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black text-xl font-semibold mb-4">Contact Us</h3>
                        <div className="flex space-x-4">
                            <Link href="https://www.instagram.com" target="_blank" className="hover:opacity-80">
                                <i className="text-[#C13584] text-2xl ion-logo-instagram"></i>
                            </Link>
                            <Link href="https://wa.me/123456789" target="_blank" className="hover:opacity-80">
                                <i className="text-[#25D366] text-2xl ion-logo-whatsapp"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-gray-300"></div>
                <div className="flex justify-between items-center pt-8">
                    <div>
                        <Image src="/logo.svg" alt="Sushi Domang Logo" width={60} height={60} />
                    </div>
                    <p className="text-sm text-gray-500">
                        2024 © Domang Sushi - All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}