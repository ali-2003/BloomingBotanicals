'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [logoFixed, setLogoFixed] = useState(false); // Controls when to stop the logo movement
  const [logoPosition, setLogoPosition] = useState(0); // Controls logo movement
  const bottleRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  
    const handleScroll = () => {
      if (bottleRef.current) {
        const bottlePosition = bottleRef.current.getBoundingClientRect().top;
        const triggerPosition = window.innerHeight * 0.5;
  
        if (bottlePosition <= triggerPosition) {
          setLogoFixed(true);
        } else {
          setLogoFixed(false);
          setLogoPosition((bottlePosition - triggerPosition) * 0.5);
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-fixed bg-cover min-h-screen font-[Poppins]" >
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-400 to-turquoise-500 py-16 md:py-24 text-center text-white">
        <div className="absolute inset-0 opacity-50 bg-cover bg-center bg-no-repeat" ></div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6" data-aos="fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Nourish Your Hair with <span className="bg-gradient-to-r from-yellow-400 to-teal-500 bg-clip-text text-transparent">Nature's Best</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Experience the power of organic ingredients with our premium shampoos. For healthy, vibrant, and naturally beautiful hair.
          </p>
          <Link href="/products" passHref>
            <div className="inline-block bg-white text-teal-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-100 transition duration-300 cursor-pointer transform hover:scale-105">
              Shop Now
            </div>
          </Link>
        </div>
      </section>

      {/* Scroll-Reveal Section with Bigger Bottle and Lower Initial Logo */}
      <section className="relative py-10 md:py-20 text-center" style={{
          backgroundImage: 'url("/images/hair.png")', // Path to your background image
          backgroundSize: "contain",  // Adjust to "contain" if you prefer that
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed", // Keeps background fixed during scroll
          backgroundPosition: "center",
        }}>
        <div className="relative max-w-md mx-auto" style={{ height: '600px' }}>
          {/* Bigger bottle */}
          <div ref={bottleRef} className="relative w-full h-full">
            <Image
              src="/images/bottle.png"
              alt="Empty Bottle"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Scrolling logo starts lower */}
          <div
            className="absolute left-0 right-0 mx-auto w-full h-20"
            style={{
              top: logoFixed ? '250px' : `${logoPosition + 400}px`, 
              transition: 'top 0.5s ease',
              position: logoFixed ? 'absolute' : 'relative',
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Blooming Botanicals Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Optional: Shop Now Button in the Bottle Section */}
          {logoFixed && (
            <Link href="/products" passHref>
              <div className="inline-block mt-2 bg-teal-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-600 transition duration-300 cursor-pointer transform hover:scale-105">
                Shop Now
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Add Extra Padding for Mobile to Prevent Collision */}
      <div className='h-10 md:h-2'></div>

      {/* Our Story Section */}
      <section id="story" className="relative bg-gradient-to-r from-teal-400 to-turquoise-500 py-12 md:py-20" data-aos="fade-right">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <div className="relative transform -skew-y-3 bg-white p-10 rounded-lg shadow-xl bg-opacity-80">
            <h2 className="text-4xl sm:text-5xl font-bold text-teal-700 mb-6 skew-y-3" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '1px' }}>
              Our Story
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto skew-y-3 leading-relaxed">
              At Blooming Botanicals, we believe in reconnecting with nature to give your hair the love it truly deserves. By using only pure, all-natural ingredients, we ensure that your hair care routine remains free from harmful chemicals. While some chemicals may offer short-term benefits, their long-term side effects can dull your hair’s natural beauty.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto skew-y-3 leading-relaxed">
              That’s why we are committed to harnessing the power of nature, delivering products that nourish your hair in the healthiest, most sustainable way possible.
            </p>
          </div>
        </div>
      </section>

      {/* Our Specialty Section (Restored) */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-gray-200">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-10 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Our Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
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
              <h3 className="text-xl font-semibold text-teal-600">Organic Ingredients</h3>
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
              <h3 className="text-xl font-semibold text-teal-600">Gentle & Effective</h3>
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
              <h3 className="text-xl font-semibold text-teal-600">Sustainable & Eco-Friendly</h3>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                We care about the environment. Our packaging and ingredients are sustainably sourced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Call to Action */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-teal-600 via-turquoise-600 to-teal-500 text-center text-white">
        <div className="relative z-10 max-w-screen-xl mx-auto px-6" data-aos="zoom-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Treat Your Hair to the Best
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Organic, cruelty-free, and eco-friendly. Give your hair the love it deserves with our nature-powered products.
          </p>
          <Link href="/products" passHref>
            <div className="inline-block bg-white text-teal-500 font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-100 transition duration-300 cursor-pointer transform hover:scale-110">
              Browse Our Products
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
