import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"
import db from "@/utils/db"
import { redirect } from "next/navigation"
import products from "@/prisma/products"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const createProduct = async (formData: FormData) => {
  "use server"
  const name = formData.get("name") as string
  const imageFile = formData.get("image") as File

  const result = (await uploadImage(imageFile)) as { secureUrl: string }

  console.log("Image upload result:", result.secureUrl)
  // if (result.secureUrl) {
  //   const product = await db.product.create({
  //     data: {
  //       name,
  //       image: result.secureUrl,
  //     },
  //   })
  //   if (product) {
  //     redirect("/products") // Redirect to the products page after successful creation
  //   }
  // }
}

const uploadImage = async (imageFile: File) => {
  const buffer = await imageFile.arrayBuffer()

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "Burger_app" }, // Cloudinary will auto-detect file type
        (error, result) => {
          if (error) {
            console.error(error)
            reject(error)
          } else {
            resolve({ secureUrl: result?.secure_url })
          }
        },
      )
      .end(Buffer.from(buffer)) // End the stream with the buffer
    return uploadStream
  })
}

export const createProductFromList = async () => {
  "use server"
  for (const product of products) {
    const result = await db.product.create({
      data: product,
    })
  }
  redirect("/products")
}

// <<<<<<<<<>>>>>>>>>>>>>>>>>

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: { featured: true },
  })
  return products
}

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }],
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    redirect("/")
  }
  return product
}
