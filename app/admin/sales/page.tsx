import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { fetchAdminOrders } from "@/utils/actions"
import { formatDate } from "@/utils/format"

async function SalesPage() {
  const orders = await fetchAdminOrders()
  return (
    <Table>
      <TableCaption>სულ შეკვეთები: {orders.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ელ. ფოსტა</TableHead>
          <TableHead>პროდუქტები</TableHead>
          <TableHead>ჯამი</TableHead>
          <TableHead>მომსახურება</TableHead>
          <TableHead>ტრანსპორტირება</TableHead>
          <TableHead>თარიღი</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const { id, products, orderTotal, tax, shipping, createdAt, email } =
            order
          return (
            <TableRow key={id}>
              <TableCell>{email}</TableCell>
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
  )
}
export default SalesPage
