import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createProductFromList } from "@/utils/actions"
import Banner from "@/components/home/Banner"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import Hero from "@/components/home/Hero"
import { Suspense } from "react"
import LoadingContainer from "@/components/global/LoadingContainer"

function HomePage() {
  return (
    <>
      <Banner />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
      <Hero />
    </>
  )
}
export default HomePage

{
  /* <form action={createProductFromList}>
        <Button type='submit'>Create Products from List</Button>
      </form> */
}
