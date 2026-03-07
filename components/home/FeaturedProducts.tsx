import { fetchFeaturedProducts } from "@/utils/actions"
import EmptyList from "../global/EmptyList"
import SectionTitle from "../global/SectionTitle"
import ProductsGrid from "../products/ProductsGrid"

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts()
  if (products.length === 0) <EmptyList />

  return (
    <section className='mb-18'>
      <SectionTitle text='პოპულარული პროდუქტები' />
      <ProductsGrid products={products} />
    </section>
  )
}
export default FeaturedProducts
