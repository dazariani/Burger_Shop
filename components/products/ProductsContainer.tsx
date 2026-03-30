import ProductsGrid from "./ProductsGrid"
import ProductsList from "./ProductsList"
import { LuLayoutGrid, LuList } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { fetchAllProducts } from "@/utils/actions"
import Link from "next/link"

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string
  search: string
}) {
  const products = await fetchAllProducts({ search })
  // sort by category
  const burgers = products.filter((product) => product.category === "ბურგერი")
  const hotDogs = products.filter((product) => product.category === "ჰოთ-დოგი")
  const tacos = products.filter(
    (product) => product.category === "ტაკო & ბურიტო",
  )
  const salads = products.filter(
    (product) => product.category === "გარნირები და სალათები",
  )
  const souces = products.filter((product) => product.category === "სოუსი")
  const softDrinks = products.filter(
    (product) => product.category === "სასმელები",
  )

  const categories = [
    { id: "burger", name: "ბურგერი", products: burgers },
    { id: "hotdog", name: "ჰოთ-დოგი", products: hotDogs },
    { id: "taco", name: "ტაკო & ბურიტო", products: tacos },
    { id: "souce", name: "სოუსი", products: souces },
    { id: "drink", name: "სასმელები", products: softDrinks },
  ]

  const totalProducts = products.length
  const searchTerm = search ? `&search=${search}` : ""

  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium text-lg'>
            <span className='text-blue-500'>{totalProducts}</span> პროდუქტი
          </h4>
          <div className='flex gap-x-4'>
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size='icon'
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>

            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size='icon'
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='my-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className='text-2xl mt-16'>პროდუქტი ვერ მოიძებნა...</h5>
        ) : layout === "grid" ? (
          <>
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductsGrid
                    key={category.name}
                    products={category.products}
                    sectionName={category.name}
                    id={category.id}
                  />
                ),
            )}
          </>
        ) : (
          <>
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductsList
                    key={category.name}
                    products={category.products}
                    sectionName={category.name}
                    id={category.id}
                  />
                ),
            )}
          </>
        )}
      </div>
    </>
  )
}
export default ProductsContainer
