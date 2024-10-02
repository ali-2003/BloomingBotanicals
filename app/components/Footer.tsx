import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-teal-600 py-6 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        
        {/* Email and Established */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm md:text-base">© 2024 Blooming Botanicals</p>
          <p className="text-sm md:text-base">Email: <a href="mailto:bloomingbotanicals2@gmail.com" className="underline hover:text-teal-500">bloomingbotanicals2@gmail.com</a></p>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-4">
          <Link href="https://www.instagram.com/bloomingbotanicals____?igsh=NjdyZzlxdjdvOWdp" target="_blank">
            <img src="/images/instagram.png" alt="Instagram" className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
