import { fetchProductReviewsByUser } from "@/utils/actions"
import ReviewsPageContainer from "@/components/reviews/ReviewsPageContainer"

async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser()
  return (
    <div>
      <ReviewsPageContainer reviews={reviews} />
    </div>
  )
}
export default ReviewsPage
