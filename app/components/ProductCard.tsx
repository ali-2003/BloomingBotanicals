import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: Array<any>; // Array of Sanity image objects
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {/* Product Image */}
      {product.images && product.images.length > 0 && (
        <div className="w-64 h-80"> {/* Fixed size for consistency */}
          <Image
            src={urlFor(product.images[0]).url()} // Display the first image from the array
            alt={product.name}
            width={300} // Ensures the same width
            height={300} // Ensures the same height
            className="object-cover w-full h-full rounded-md" // Ensures the image fills the container
          />
        </div>
      )}

      {/* Product Info */}
      <h2 className="text-2xl font-semibold m-4">{product.name}</h2>
      <div className="inline-block bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-2 px-4 rounded-lg mb-6">
            <p className="text-3xl font-semibold">Rs. {product.price}</p>
          </div>

      {/* Add to Cart Button (Hidden by default, shown on hover) */}
      <button className="absolute bottom-6 opacity-0 transition-opacity duration-300 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 hover:opacity-100 hover:translate-y-0">
        Add to Cart
      </button>
    </div>
  );
};
