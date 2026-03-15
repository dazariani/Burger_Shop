import SectionTitle from "@/components/global/SectionTitle"
import ProductsGrid from "@/components/products/ProductsGrid"
import { fetchUserFavorites } from "@/utils/actions"

async function FavoritesPage() {
  const favorites = await fetchUserFavorites()

  if (favorites.length === 0)
    return <SectionTitle text='თქვენ ჯერ არ გაქვთ დამატებული ფავორიტები' />

  return (
    <div>
      <SectionTitle text='ფავორიტები' />
      <ProductsGrid products={favorites.map((fav) => fav.product)} />
    </div>
  )
}
export default FavoritesPage
