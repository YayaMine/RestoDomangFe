"use client";
import Image from "next/image";
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Menandakan bahwa komponen ini berjalan di sisi client
    setIsClient(true);
  }, []);

  const smoothScroll = useCallback((targetId) => {
    // Pastikan smoothScroll hanya berjalan di sisi client
    if (isClient) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, [isClient]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 shadow-md text-sm">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
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
          <ul className="flex space-x-6 justify-center text-white">
            <li>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("hero");
                }}
                className="hover:text-[#C06014]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("menu");
                }}
                className="hover:text-[#C06014]"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("about");
                }}
                className="hover:text-[#C06014]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("services");
                }}
                className="hover:text-[#C06014]"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#location"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("location");
                }}
                className="hover:text-[#C06014]"
              >
                Location
              </a>
            </li>
          </ul>
        </nav>
        <Link
          href="/member"
          className="ml-auto bg-white text-[#C06014] py-2 px-6 rounded-full hover:bg-[#AD4C10] focus:outline-none text-base"
        >
          Member
        </Link>
      </div>
    </header>
  );
}
