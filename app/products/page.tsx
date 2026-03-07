import db from "@/utils/db"
import { createProduct } from "@/utils/actions"
import Image from "next/image"
import ProductsContainer from "@/components/products/ProductsContainer"

async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string }
}) {
  const params = await searchParams
  const layout = params.layout || "grid"
  const search = params.search || ""

  return <ProductsContainer layout={layout} search={search} />
}

export default ProductsPage

// async function ProductsPage() {
//   const products = await db.product.findMany()

//   return (
//     <div>
//       <form action={createProduct} className='mb-30'>
//         <input type='text' name='name' placeholder='Product Name' />
//         <input type='file' name='image' />
//         <button type='submit'>Create Product</button>
//       </form>
//       <div className=' flex gap-10 flex-wrap'>
//         {products &&
//           products.map((product) => (
//             <div key={product.id}>
//               <Image
//                 // className='h-auto'
//                 src={product.image}
//                 alt={product.name}
//                 width={200}
//                 height={200}
//               />
//               <h2>{product.name}</h2>
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// }
