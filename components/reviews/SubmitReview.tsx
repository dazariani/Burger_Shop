import { SubmitButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import { Card } from "@/components/ui/card"
import RatingInput from "@/components/reviews/RatingInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import { createReviewAction } from "@/utils/actions"
import { currentUser } from "@clerk/nextjs/server"

async function SubmitReview({ productId }: { productId: string }) {
  const user = await currentUser()

  return (
    <div>
      {user && (
        <Card className='p-8 mt-10'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='productId' value={productId} />
            <input
              type='hidden'
              name='authorName'
              value={user?.fullName || "user"}
            />
            <input type='hidden' name='authorImageUrl' value={user?.imageUrl} />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              labelText='feedback'
              defaultValue='This is absolutely delicious'
            />
            <SubmitButton className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}
export default SubmitReview
