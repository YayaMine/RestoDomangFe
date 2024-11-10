"use client";
import { useEffect } from "react";
import jQuery from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

export default function Review() {
  useEffect(() => {
    const $ = jQuery;

    if ($ && typeof $(".review-slider").slick === "function") {
      $(".review-slider").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      });
    }

    return () => {
      if ($(".review-slider").slick("getSlick")) {
        $(".review-slider").slick("unslick");
      }
    };
  }, []);

  return (
    <section className="text-left mt-4 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold text-[#C06014]">CUSTOMER REVIEW</h2>
  <p className="text-left text-gray-600 mt-4 max-w-3xl mx-auto">
    Kami berkomitmen menghadirkan hidangan berkualitas tinggi yang bisa dinikmati oleh Anda dan para tamu. Setiap kunjungan di tempat kami diharapkan terasa hangat dan berkesan, dengan pelayanan terbaik dan suasana yang nyaman. Merupakan kebahagiaan bagi kami untuk bisa melayani Anda!
  </p>
  <p className="text-left text-gray-600 mt-2 max-w-3xl mx-auto">
    Pernah menikmati pengalaman bersantap bersama kami? Beri tahu kami pendapat Anda. Masukan Anda sangat berharga dan membantu kami untuk terus menjadi lebih baik!
  </p>

  <div className="review-slider mt-8 flex justify-center mx-auto max-w-md">
    <div className="w-full max-w-md p-4 border rounded-lg shadow-lg bg-white">
      <div className="flex items-center mb-2">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h3 className="text-lg font-semibold">Dani Pingge</h3>
          <div className="flex space-x-1 text-yellow-500">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-2 text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet dolor nec orci facilisis varius.
      </p>
    </div>

    <div className="w-full max-w-md p-4 border rounded-lg shadow-lg bg-white">
      <div className="flex items-center mb-2">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h3 className="text-lg font-semibold">Dani Cumbak</h3>
          <div className="flex space-x-1 text-yellow-500">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-2 text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </p>
    </div>

    <div className="w-full max-w-md p-4 border rounded-lg shadow-lg bg-white">
      <div className="flex items-center mb-2">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h3 className="text-lg font-semibold">Dani Binjek</h3>
          <div className="flex space-x-1 text-yellow-500">
            <span>★</span><span>★</span><span>★</span><span>☆</span><span>☆</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-2 text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus sed augue semper porta.
      </p>
    </div>
  </div>
</section>

  );
}
