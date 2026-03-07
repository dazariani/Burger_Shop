import * as pr from "../generated/prisma/client"

// eslint-disable-next-line @typescript-eslint/no-require-imports
// const { PrismaClient } = require("../generated/prisma/client")
import products from "./products"
// const products = require('./products.json');
const prisma = new pr.PrismaClient()

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
