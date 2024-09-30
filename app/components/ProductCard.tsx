import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: any[]; // Array of Sanity image objects
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {/* Product Image */}
      {product.images && product.images.length > 0 && (
        <Image
          src={urlFor(product.images[0]).url()} // Display the first image from the array
          alt={product.name}
          width={300}
          height={300}
          className="object-cover rounded-md"
        />
      )}

      {/* Product Info */}
      <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
      <p className="text-lg font-medium text-gray-600 mt-2">${product.price}</p>

      {/* Add to Cart Button (Hidden by default, shown on hover) */}
      <button className="absolute bottom-6 opacity-0 transition-opacity duration-300 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 hover:opacity-100 hover:translate-y-0">
        Add to Cart
      </button>
    </div>
  );
};
