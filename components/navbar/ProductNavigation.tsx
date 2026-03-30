"use client"
import { useRouter } from "next/navigation"

const categories = [
  { id: "burger", name: "ბურგერი" },
  { id: "hotdog", name: "ჰოთ-დოგი" },
  { id: "taco", name: "ტაკო & ბურიტო" },
  { id: "souce", name: "სოუსი" },
  { id: "drink", name: "სასმელები" },
]

function ProductNavigation() {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/products#${id}`)
  }

  return (
    <div className=' hidden md:flex justify-between mx-auto max-w-6xl mb-5 text-muted-foreground'>
      {categories.map((category) => (
        <button
          className='cursor-pointer hover:transform hover:scale-105 transition-transform duration-100 ease-in-out'
          key={category.id}
          onClick={() => handleClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
export default ProductNavigation
