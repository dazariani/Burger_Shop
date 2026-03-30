import Link from "next/link"
import { Product } from "../../generated/prisma/client"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import FavoriteToggleButton from "./FavoriteToggleButton"

function ProductsGrid({
  products,
  sectionName,
  id,
}: {
  products: Product[]
  sectionName: string
  id: string
}) {
  return (
    <>
      <h1 id={id} className='text-2xl mt-10'>
        {sectionName}
      </h1>
      <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
        {products.map((product) => {
          const { name, price, image } = product
          const productId = product.id

          return (
            <article key={productId} className='group relative'>
              <div className='absolute top-7 right-7 z-4'>
                <FavoriteToggleButton productId={productId} />
              </div>
              <Link href={`/products/${productId}`}>
                <Card className='transform group-hover:shadow-xl transition-shadow duration-500 py-0'>
                  <CardContent className='p-4'>
                    <div className='relative h-64 md:h-48 rounded overflow-hidden'>
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority
                        className='rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500'
                      />
                    </div>
                    <div className='mt-4 text-center'>
                      <h2 className='text-lg capitalize'>{name}</h2>
                      <p className='text-muted-foreground mt-2'>
                        {price + " ₾"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </article>
          )
        })}
      </div>
    </>
  )

  return <div>ProductsGrid</div>
}
export default ProductsGrid
