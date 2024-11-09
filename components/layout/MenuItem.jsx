import Image from 'next/image';

export default function MenuItem({ name, price, imageSrc }) {
    return (
      <div className="border p-10 rounded-lg shadow-md text-center bg-[#C06014] text-white">
        <Image 
          src={imageSrc} 
          alt={name} 
          width={200} 
          height={200} 
          className="border p-1 bg-white rounded-2xl mx-auto mb-4"
        />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-white">Rp {price.toLocaleString()}</p>
      </div>
    );
  }