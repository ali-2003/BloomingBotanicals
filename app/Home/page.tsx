import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nourish Your Hair with Nature's Best
          </h1>
          <p className="text-md md:text-lg mb-8">
            Experience the power of organic ingredients with our premium shampoos. For healthy, vibrant, and naturally beautiful hair.
          </p>
          <Link href="/products" className="inline-block bg-white text-teal-500 font-medium py-3 px-6 rounded-full hover:bg-teal-50 transition duration-300">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-[5%] grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Organic Ingredients */}
          <div>
            <div className="relative w-[60%] sm:w-[50%] md:w-[80%] mx-auto h-0 pb-[60%] sm:pb-[50%] md:pb-[80%]">
              <Image
                src="/images/amla-reetha-shikakai.jpg"
                alt="Organic Ingredients"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold mt-4">Organic Ingredients</h2>
            <p className="mt-2 text-sm md:text-gray-600">
              Our products are made with all-natural, organic ingredients to nourish your hair from the roots.
            </p>
          </div>

          {/* Gentle & Effective */}
          <div>
            <div className="relative w-[60%] sm:w-[50%] md:w-[80%] mx-auto h-0 pb-[60%] sm:pb-[50%] md:pb-[80%]">
              <Image
                src="/images/GentleHair.avif"
                alt="Gentle & Effective"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold mt-4">Gentle & Effective</h2>
            <p className="mt-2 text-sm md:text-gray-600">
              Designed to be gentle yet powerful. Perfect for all hair types, even the most sensitive.
            </p>
          </div>

          {/* Sustainable & Eco-Friendly */}
          <div>
            <div className="relative w-[60%] sm:w-[50%] md:w-[80%] mx-auto h-0 pb-[60%] sm:pb-[50%] md:pb-[80%]">
              <Image
                src="/images/sustainable.webp"
                alt="Sustainable & Eco-Friendly"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold mt-4">Sustainable & Eco-Friendly</h2>
            <p className="mt-2 text-sm md:text-gray-600">
              We care about the environment. Our packaging and ingredients are sustainably sourced.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto px-[5%] text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Treat Your Hair to the Best</h2>
          <p className="text-md md:text-lg mb-8">
            Organic, cruelty-free, and eco-friendly. Give your hair the love it deserves.
          </p>
          <Link href="/products" className="inline-block bg-teal-500 text-white font-medium py-3 px-6 rounded-full hover:bg-teal-600 transition duration-300">
            Browse Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
