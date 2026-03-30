import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "../../generated/prisma/client"
import Image from "next/image"
import FavoriteToggleButton from "./FavoriteToggleButton"

function ProductsList({
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
      <div className='mt-2 mb-15 grid gap-y-8'>
        {products.map((product) => {
          const { name, price, image } = product
          const productId = product.id
          return (
            <article key={productId} className='group relative'>
              <Link href={`/products/${productId}`}>
                <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                  <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                    <div className='relative h-64 md:h-48 md:w-48'>
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority
                        className='rounded w-full object-cover'
                      />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold capitalize'>
                        {name}
                      </h2>
                    </div>
                    <p className='text-muted-foreground text-lg md:ml-auto'>
                      {price + " ₾"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <div className='absolute bottom-8 right-8 z-4'>
                <FavoriteToggleButton productId={productId} />
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

export default ProductsList
