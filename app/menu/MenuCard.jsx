"use client";
import React from "react";
import Image from "next/image";

const MenuCard = ({ menu }) => {
    return (
      <div className="overflow-hidden transition-shadow bg-white border rounded-lg shadow-lg hover:shadow-xl">
        <div className="relative w-full h-48">
          <Image
            src={menu.image}
            alt={menu.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-orange-500">{menu.price}</h3>
          <p className="font-semibold text-gray-800">{menu.name}</p>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {menu.description}
          </p>
        </div>
      </div>
    );
  };
  
  export default MenuCard;