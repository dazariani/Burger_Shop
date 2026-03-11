import EmptyList from "@/components/global/EmptyList"
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"

async function AdminProductsPage() {
  const items = await fetchAdminProducts()
  if (items.length === 0) {
    return <EmptyList />
  }

  return (
    <section>
      <Table>
        <TableCaption>სულ პროდუქტები: {items.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>დასახელება</TableHead>
            <TableHead>კატეგორია</TableHead>
            <TableHead>ფასი</TableHead>
            <TableHead>მოქმედება</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  href={`/products/${item.id}`}
                  className='underline text-muted-foreground hover:text-foreground tracking-wide capitalize'
                >
                  {item.name}
                </Link>
              </TableCell>

              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price} ₾</TableCell>
              <TableCell className='flex items-center gap-x-2'>
                <Link href={`/admin/products/${item.id}/edit`}>
                  <IconButton actionType='edit' />
                </Link>
                <DeleteProduct productId={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId })

  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default AdminProductsPage
