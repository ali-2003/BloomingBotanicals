// app/index.tsx

import Image from "next/image";
import { client } from "@/sanity/lib/client";


import HomePageComponent from "./Home/page"; // Assuming this is the intended component

export default async function Home() {
  const products = await client.fetch('*[_type == "product"]');
  console.log(products);

  return (
    <>
      {/* Navbar (if you want to include it on the homepage) */}


      <main className="container mx-auto mt-8">
        {/* Render the HomePageComponent */}
        <HomePageComponent />
      </main>
    </>
  );
}

