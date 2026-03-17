"use client"
import CommentCard from "./CommentCard"
import { ReviewAndProduct } from "@/utils/types"
import { deleteReviewAction } from "@/utils/actions"
import { LuTrash2 } from "react-icons/lu"
import FormContainer from "@/components/form/FormContainer"
import { Button } from "../ui/button"
import SectionTitle from "@/components/global/SectionTitle"

interface ReviewProps {
  reviews: ReviewAndProduct[]
}

function ReviewsPageContainer(props: ReviewProps) {
  const { reviews } = props
  return (
    <>
      <SectionTitle text='ჩემი მიმოხილვები' />
      <div className='grid md:grid-cols-2 gap-x-8'>
        {reviews.length === 0 && (
          <h2 className='mt-15 text-sm'>თქვენ არ გაქვთ მიმოხილვები</h2>
        )}
        {reviews.map((rev, ind) => {
          const { authorName, authorImageUrl, rating, comment, id, product } =
            rev
          return (
            <div key={ind} className='group relative'>
              <CommentCard
                authorName={product.name}
                authorImageUrl={authorImageUrl}
                rating={rating}
                comment={comment}
              />
              <div className='absolute top-14 right-7 z-4'>
                <FormContainer action={deleteReviewAction}>
                  <Button type='submit' className='cursor-pointer'>
                    <input type='hidden' name='id' value={id} />
                    <LuTrash2 size={"sm"} />
                  </Button>
                </FormContainer>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default ReviewsPageContainer
