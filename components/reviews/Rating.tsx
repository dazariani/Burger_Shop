import Image from "next/image"
import { IoStarOutline } from "react-icons/io5"
import { IoStarSharp } from "react-icons/io5"

function Rating({
  rating,
  authorName,
  authorImageUrl,
}: {
  rating: number
  authorName: string
  authorImageUrl: string
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating)
  return (
    <div className='flex items-center gap-4'>
      <Image
        src={authorImageUrl}
        width={50}
        height={50}
        alt='userImage'
        className='rounded-full'
      />
      <div>
        <p className='text-sm font-bold capitalize mb-1'>{authorName}</p>
        <div className='flex'>
          {stars.map((s, i) =>
            s ? <IoStarSharp key={i} /> : <IoStarOutline key={i} />,
          )}
        </div>
      </div>
    </div>
  )
}
export default Rating
