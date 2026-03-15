import { fetchProductReviews } from "@/utils/actions"
import CommentCard from "./CommentCard"
import { Review } from "@/utils/types"

interface ReviewProps {
  reviews: Review[]
}

async function ProductReviews(props: ReviewProps) {
  const { reviews } = props
  return (
    <div>
      {reviews.map((rev) => {
        const { authorName, authorImageUrl, rating, comment } = rev
        return (
          <CommentCard
            key={rev.id}
            authorName={authorName}
            authorImageUrl={authorImageUrl}
            rating={rating}
            comment={comment}
          />
        )
      })}
    </div>
  )
}
export default ProductReviews
