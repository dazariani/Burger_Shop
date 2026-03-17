import Image from "next/image"
import Link from "next/link"

export const FirstColumn = ({
  name,
  image,
}: {
  name: string
  image: string
}) => {
  return (
    <div className='relative h-24 w-24 sm:h-32 sm:w-32'>
      <Image
        src={image}
        alt={name}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
        className='rounded w-full object-cover'
      />
    </div>
  )
}

export const SecondColumn = ({
  name,
  productId,
}: {
  name: string
  productId: string
}) => {
  return (
    <div className='sm:w-48'>
      <Link href={`/products/${productId}`}>
        <h3 className='capitalize font-medium hover:underline'>{name}</h3>
      </Link>
    </div>
  )
}

export const FourthColumn = ({ price }: { price: number }) => {
  return <p className='md:ml-auto font-medium'>{price + " ₾"}</p>
}
