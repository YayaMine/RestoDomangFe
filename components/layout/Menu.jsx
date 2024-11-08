import MenuItem from './MenuItem';
import React from 'react';

export default function Menu(){
    return(
        <section id="menu" className="py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Menu Populer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MenuItem 
          name="Salmon Nigiri" 
          price={35000} 
          imageSrc="/salmon-nigiri.png" 
        />
        <MenuItem 
          name="California Roll" 
          price={50000} 
          imageSrc="/api/placeholder/200/200" 
        />
        <MenuItem 
          name="Tuna Sashimi" 
          price={45000} 
          imageSrc="/api/placeholder/200/200" 
        />
        <MenuItem 
          name="Matcha Ice Cream" 
          price={25000} 
          imageSrc="/api/placeholder/200/200" 
        />
      </div>
    </div>
  </section>
    )
}