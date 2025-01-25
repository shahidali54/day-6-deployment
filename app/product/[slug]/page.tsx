import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import Image from "next/image";

interface productProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      _type,
      productImage,
      price,
      description,
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: productProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
        <div className="flex justify-center">
          {product.productImage && (
            <Image
              src={urlFor(product.productImage).url()}
              alt={product.title}
              width={500}
              height={500}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-4/5"
            />
          )}
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-xl font-semibold text-indigo-600">${product.price}</p>
          <p className="text-base text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <button className="w-full md:w-auto bg-indigo-600 text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-indigo-500 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
