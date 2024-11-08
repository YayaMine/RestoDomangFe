import Image from 'next/image';

export default function MenuItem({ name, price, imageSrc }) {
    return (
      <div className="border p-4 rounded-lg shadow-md text-center">
        <Image 
          src={imageSrc} 
          alt={name} 
          width={200} 
          height={200} 
          className="mx-auto mb-4"
        />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">Rp {price.toLocaleString()}</p>
      </div>
    );
  }