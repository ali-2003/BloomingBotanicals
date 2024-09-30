import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-center">
     

        {/* Social Media Icons */}
        <div className="mt-4 md:mt-0">
          <Link href="https://www.instagram.com" target="_blank">
            {/* Add your Instagram logo image here */}
            <img src="/images/instagram.png" alt="Instagram" className="h-6 w-6" />
            
          </Link>
        </div>

        
      </div>
    </footer>
  );
}
