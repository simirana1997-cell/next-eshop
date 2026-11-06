import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import Link from 'next/link'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Optional: Agar user auth check ki zaroorat ho
  const { user } = await payload.auth({ headers })

  // 1. Fetch Categories
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 6,
  })

  // 2. Fetch Featured Products
  const productsData = await payload.find({
    collection: 'products',
    limit: 8,
    sort: '-createdAt',
  })

  const categories = categoriesData.docs
  const products = productsData.docs

  console.log('====== CATEGORIES DATA ======', JSON.stringify(categories, null, 2))
  console.log('====== PRODUCTS DATA ======', JSON.stringify(products, null, 2))

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Discover Our Exclusive Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Shop the latest trends with premium quality and unbeatable prices.
          </p>
          <Link
            href="/shop"
            className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop By Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map((category: any) => {
              const imageUrl = category.image?.url || '/placeholder.jpg'

              return (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="group flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-black"
                >
                  {/* Category Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={category.image?.alt || category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category Title */}
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base text-center group-hover:text-black transition-colors line-clamp-1">
                    {category.title}
                  </h3>
                </Link>
              )
            })
          ) : (
            <p className="col-span-full text-center text-red-500">No categories found.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
     <section className="max-w-7xl mx-auto px-4 py-12 mb-20">
  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.length > 0 ? (
      products.map((product: any) => {
        // Check karein ke product.image aur url mojood hai ya nahi
        const imageUrl = product.images?.[0]?.url ? product.images[0].url : null

        return (
          <div
            key={product.id}
            className="group flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-black"
          >
            {/* product Image */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3 bg-gray-100">
              {imageUrl ? (
              <img
      src={imageUrl}
      alt={product.image?.[0]?.alt || product.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* product Title & Price */}
            <h3 className="font-semibold text-gray-800 text-sm md:text-base text-center group-hover:text-black transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
            <h3 className="text-black font-bold mb-3">
              {product.regularPrice || product.price} Pkr
            </h3>

            <Link
              href={`/products/${product.slug}`}
              className="w-full bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition block text-sm"
            >
              View Details
            </Link>
          </div>
        )
      })
    ) : (
      <p className="col-span-full text-center text-red-500">No products found.</p>
    )}
  </div>
</section>
    </div>
  )
}
