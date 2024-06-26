import React from "react";
import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../app/lib/sanity";
import Image from "next/image";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
      _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
  }`;

  return client.fetch(query);
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    
    <main className='h-full'>
    <Navbar isPro={false}/>
    <div className='hidden md:flex mt-16 fixed inset-y-0 flex-col'>
        <Sidebar isPro={false}/>
    </div>
    <main className='md:pl-20 pt-16 h-full'></main>
    <main>
      <div className="mt-24 ">
        <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-white ml-32 category-0">
              Our Products for {params.category}
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 ml-32 category-1 ">
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                    layout="responsive"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-white ml-32 category-2 ">
                      <Link href={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-200 ml-32 category-3">
                      {product.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>

    
  </main>
  );
}
