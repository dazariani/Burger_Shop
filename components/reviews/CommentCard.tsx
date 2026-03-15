import Rating from "./Rating"
import Comment from "./Comment"
import { Card } from "@/components/ui/card"

type commentProps = {
  authorName: string
  authorImageUrl: string
  rating: number
  comment: string
}

function CommentCard(props: commentProps) {
  const { authorName, authorImageUrl, rating, comment } = props

  return (
    <Card className='p-8 mt-10'>
      <Rating
        rating={rating}
        authorName={authorName}
        authorImageUrl={authorImageUrl}
      />
      <Comment commentText={comment} />
    </Card>
  )
}
export default CommentCard
