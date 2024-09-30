import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Name */}
        <div className="text-lg font-semibold">
          © 2024 Blooming Botanicals. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="mt-4 md:mt-0">
          <Link href="https://www.instagram.com" target="_blank">
            {/* Add your Instagram logo image here */}
            <img src="/images/instagram.png" alt="Instagram" className="h-6 w-6" />
          </Link>
        </div>

        {/* Established Year
        <div className="mt-4 md:mt-0">
          Established in 2024
        </div> */}
      </div>
    </footer>
  );
}
