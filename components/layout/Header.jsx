"use client";
import Image from "next/image";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleBooking = () => {
    setIsBookingOpen(!isBookingOpen);
  };

  const smoothScroll = (targetId) => {
    document.getElementById(targetId).scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 shadow-md~">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/newlogo.png" alt="Logo" width={60} height={64} />
            <h1 className="text-2xl font-bold">
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
        <button
          onClick={toggleBooking}
          className="ml-auto bg-white text-[#C06014] py-2 px-6 rounded-full hover:bg-[#AD4C10] focus:outline-none"
        >
          Member
        </button>
      </div>

      {isBookingOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
            <p className="text-gray-600 mb-4">This is a placeholder for booking form.</p>
            <button
              onClick={toggleBooking}
              className="bg-[#C06014] text-white py-2 px-4 rounded-lg hover:bg-[#AD4C10] focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
