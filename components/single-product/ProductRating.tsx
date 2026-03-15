import { FaStar } from "react-icons/fa"
import { fetchProductRating } from "@/utils/actions"

async function ProductRating({ productId }: { productId: string }) {
  const productAndReviews = await fetchProductRating({ productId })
  const reviews = productAndReviews.map((pr) => pr.reviews)[0]
  const ratingAvg =
    reviews.map((r) => Number(r.rating)).reduce((sum, num) => sum + num, 0) /
    reviews.length

  const className = "flex gap-1 items-center text-md mt-1 mb-4"
  const countValue = `(${reviews.length}) reviews`

  return (
    <span className={className}>
      <FaStar />
      {ratingAvg} {countValue}
    </span>
  )
}
export default ProductRating
