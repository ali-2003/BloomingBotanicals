import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-cyan-600 py-16 md:py-24 text-center text-white">
        <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}></div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-md">
            Nourish Your Hair with <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Nature's Best</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Experience the power of organic ingredients with our premium shampoos. For healthy, vibrant, and naturally beautiful hair.
          </p>
          <Link href="/products" passHref>
            <div className="inline-block bg-white text-teal-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-100 transition duration-300 cursor-pointer">
              Shop Now
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
          {/* Organic Ingredients */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="relative w-full h-56 mb-6">
              <Image
                src="/images/amla-reetha-shikakai.jpg"
                alt="Organic Ingredients"
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-teal-600">Organic Ingredients</h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Our products are made with all-natural, organic ingredients to nourish your hair from the roots.
            </p>
          </div>

          {/* Gentle & Effective */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="relative w-full h-56 mb-6">
              <Image
                src="/images/GentleHair.avif"
                alt="Gentle & Effective"
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-teal-600">Gentle & Effective</h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Designed to be gentle yet powerful. Perfect for all hair types, even the most sensitive.
            </p>
          </div>

          {/* Sustainable & Eco-Friendly */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="relative w-full h-56 mb-6">
              <Image
                src="/images/sustainable.webp"
                alt="Sustainable & Eco-Friendly"
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-teal-600">Sustainable & Eco-Friendly</h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              We care about the environment. Our packaging and ingredients are sustainably sourced.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-600 mb-6">
            Treat Your Hair to the Best
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Organic, cruelty-free, and eco-friendly. Give your hair the love it deserves.
          </p>
          <Link href="/products" passHref>
            <div className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-600 transition duration-300 cursor-pointer">
              Browse Our Products
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
