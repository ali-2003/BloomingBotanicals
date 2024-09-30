import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full z-10 top-0">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo (acts as a home button) */}
        <Link href="/" className="flex items-center">
          <span
            className="text-4xl sm:text-2xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Blooming Botanicals
          </span>
        </Link>

        {/* Links (Shop and Cart) */}
        <div className="flex items-center space-x-8">
          {/* Shop Button */}
          <Link href="/products">
            <button className="px-6 py-2 border-2 border-black rounded-full text-lg font-medium text-gray-700 hover:bg-gradient-to-r hover:from-teal-400 hover:to-cyan-500 hover:text-white transition duration-300 font-serif">
              Shop
            </button>
          </Link>

          {/* Cart Icon Placeholder */}
          <Link href="/Cart" className="relative">
            <img src="/images/market.png" alt="Cart Icon" className="w-8 h-8" />
            {/* Optional Cart Badge */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
