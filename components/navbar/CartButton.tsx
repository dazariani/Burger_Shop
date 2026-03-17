import { LuShoppingCart } from "react-icons/lu"
import Link from "next/link"
import { Button } from "../ui/button"
import { fetchCartItems } from "@/utils/actions"

async function CartButton() {
  // temp
  const numItemsInCart = await fetchCartItems()

  return (
    <Button
      variant='outline'
      size={"icon"}
      asChild
      className='flex justify-center items-center relative'
    >
      <Link href='/cart' className='flex items-center gap-2'>
        <LuShoppingCart />
        <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs'>
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  )
}
export default CartButton
