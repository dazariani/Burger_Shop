import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import SectionTitle from "@/components/global/SectionTitle"
import { fetchUserOrders } from "@/utils/actions"
import { formatDate } from "@/utils/format"

async function OrdersPage() {
  const orders = await fetchUserOrders()
  return (
    <>
      <SectionTitle text='ჩემი შეკვეთები' />
      <Table>
        <TableCaption>სულ შეკვეთები: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>პროდუქტები</TableHead>
            <TableHead>ჯამი</TableHead>
            <TableHead>მომსახურება</TableHead>
            <TableHead>ტრანსპორტირება</TableHead>
            <TableHead>თარიღი</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { id, products, orderTotal, tax, shipping, createdAt } = order
            return (
              <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>{orderTotal} ₾</TableCell>
                <TableCell>{tax} ₾</TableCell>
                <TableCell>{shipping} ₾</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
export default OrdersPage
