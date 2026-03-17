import { Card, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createOrderAction } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import { SubmitButton } from "../form/Buttons"
import { Cart } from "@/generated/prisma/client"

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, tax, orderTotal, shipping } = cart
  return (
    <div>
      <Card className='p-8'>
        <CartTotalRow label='სულ' amount={cartTotal} />
        <CartTotalRow label='ტრანსპორტირება' amount={shipping} />
        <CartTotalRow label='მომსახურება' amount={tax} />
        <CardTitle className='mt-8'>
          <CartTotalRow label='შეკვეთის ჯამი' amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text='შეკვეთა' className='w-full mt-8' />
      </FormContainer>
    </div>
  )
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string
  amount: number
  lastRow?: boolean
}) {
  return (
    <>
      <p className='flex justify-between text-sm'>
        <span>{label}</span>
        <span>{amount} ₾</span>
      </p>
      {lastRow ? null : <Separator />}
    </>
  )
}

export default CartTotals
