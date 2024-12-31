"use client";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect } from "react";
import jQuery from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

export default function Hero() {
  useEffect(() => {
    const $ = jQuery;

    const initSlick = () => {
      if ($ && typeof $(".slider").slick === "function" && $(".slider").length > 0) {
        $(".slider").slick({
          dots: false,
          infinite: true,
          speed: 500,
          fade: true,
          cssEase: "linear",
          autoplay: true,
          autoplaySpeed: 2500,
        });
      }
    };

    const timer = setTimeout(initSlick, 100);

    return () => {
      if ($(".slider").hasClass("slick-initialized")) {
        $(".slider").slick("unslick");
      }
      clearTimeout(timer); 
    };
  }, []);

  return (
    <section
      className="relative h-screen bg-center bg-cover"
      id="hero"
      style={{ backgroundImage: "url('/sushi2.png')" }}
    >
      <div className="absolute inset-0 z-10 bg-black/60"></div>

      <div className="relative z-20 h-full px-4 mx-auto max-w-7xl lg:px-8">
        <div className="grid items-center h-full grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-white lg:text-3xl">
              Kelezatan Rasa Sushi
              <br />
              Terbaik Di Bali
            </h1>
            <p className="max-w-xl text-lg text-gray-300">
              Nikmati Pengalaman Kuliner Jepang Autentik Dengan Sentuhan Modern Di
              Domang Sushi.
            </p>

            <Link
              href="#reservation"
              className="bg-[#C06014] text-white text-base font-semibold py-3 px-8 rounded-full hover:bg-[#AD4C10] transition duration-300"
            >
              Make a Reservation
            </Link>

            <div className="relative w-full max-w-md mt-4">
              <input
                type="text"
                placeholder="Menu apa yang kamu inginkan hari ini?"
                className="w-full py-3 pl-5 pr-16 bg-white rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C06014]"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#C06014] text-white p-2 rounded-full hover:bg-[#AD4C10] transition duration-300">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block h-[500px] w-full">
            <div className="slider">
              <div className="relative h-[500px]">
                <Image
                  src="/salmon-nigiri.png"
                  alt="Sushi 1"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="/sushi.png"
                  alt="Sushi 2"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="/fajar.jpg"
                  alt="Sushi 3"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
