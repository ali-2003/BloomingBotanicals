// app/products/[slug]/page.tsx

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import AddToCart from '../../components/AddToCart';
import { notFound } from 'next/navigation';

// Import Google Font (Dancing Script) from next/font
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export async function generateStaticParams() {
  const products = await client.fetch('*[_type == "product"]{slug}');

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!product) {
    notFound();
  }

  return (
    <section className="container mx-auto py-10 px-20">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-start lg:justify-start">
        {/* Product Image Section */}
        <div className="w-full lg:w-1/2 flex justify-start">
          {product.images && (
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </div>

        {/* Product Details Section aligned to the image */}
        <div className="flex-1 lg:w-1/2">
          {/* Product Name */}
          <h1 className={`text-4xl lg:text-5xl mb-4 ${dancingScript.className} text-teal-600`}>
            {product.name}
          </h1>

          {/* Product Price with Gradient Box */}
          <div className="inline-block bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-2 px-4 rounded-lg mb-6">
            <p className="text-3xl font-semibold">Rs. {product.price}</p>
          </div>

          {/* Product Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 bg-white bg-opacity-45 rounded-lg p-4">
            <strong>{product.description}</strong>
          </p>

          {/* Key Features */}
          <div className="mt-5 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Key Features</h2>
            <ul className="list-disc list-inside text-md lg:text-l text-gray-600 space-y-2">
              <li>Made with 100% organic ingredients</li>
              <li>Gentle on all hair types</li>
              <li>Eco-friendly packaging</li>
            </ul>
          </div>

          {/* Quantity and Add to Cart Below Key Features */}
          <div className="mt-10">
            <AddToCart
              productSlug={product.slug}  // Pass the slug object here
              productName={product.name}   // Pass the name
              productPrice={product.price} // Pass the price
              productImage={urlFor(product.images[0]).url()} // Pass the image
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const revalidate = 60; 