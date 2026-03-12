import db from "@/utils/db"

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
