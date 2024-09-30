import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { ProductCard } from '../components/ProductCard';

// Define the structure of the product in Sanity
interface Product {
  _id: string;
  slug: { current: string };
  name: string;
  price: number;
  images: Array<any>; // Array of Sanity image objects
}

export default async function Products() {
  const products: Product[] = await client.fetch('*[_type == "product"]');
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>

      {/* Check if products exist and display them */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center max-w-screen-lg mx-auto">
          {products.map((product: Product) => (
            <Link key={product._id} href={`/products/${product.slug.current}`} passHref>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center">No products found.</p>
      )}
    </div>
  );
}
