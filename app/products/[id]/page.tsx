import BreadCrumbs from "@/components/single-product/BreadCrumbs"
import { fetchSingleProduct } from "@/utils/actions"
import Image from "next/image"
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton"
import AddToCart from "@/components/single-product/AddToCart"
import ProductRating from "@/components/single-product/ProductRating"
import SubmitReview from "@/components/reviews/SubmitReview"
import ProductReviews from "@/components/reviews/ProductReviews"
import { currentUser } from "@clerk/nextjs/server"
import { fetchProductReviews } from "@/utils/actions"

async function SingleProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const user = await currentUser()
  const product = await fetchSingleProduct(id)
  const reviews = await fetchProductReviews(product.id)
  const hasReview = reviews.some((rev) => rev.clerkId === user?.id)

  const { name, image, description, price } = product

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className='mt-6 flex md:flex-row gap-14 flex-col'>
        {/* IMAGE FIRST COL */}
        <div>
          <Image
            src={image}
            alt={name}
            width={700}
            height={700}
            className='h-auto rounded object-contain'
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className='flex gap-x-8 items-center'>
            <h1 className='capitalize text-3xl font-bold mb-3'>{name} </h1>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          {/* <h4 className='text-xl mt-2'>{}</h4> */}
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded'>
            {price} ₾
          </p>
          <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
      <ProductReviews reviews={reviews} />
      {!hasReview && <SubmitReview productId={id} />}
    </section>
  )
}
export default SingleProductPage
