"use server"

import db from "@/utils/db"
import { redirect } from "next/navigation"
import products from "@/prisma/products"
import { currentUser } from "@clerk/nextjs/server"
import { productSchema, validateWithZodSchema } from "./schemas"
import { uploadImage } from "@/utils/cloudinary"

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

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
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

const renderError = (error: unknown) => {
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: "something went wrong" }
}

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    return redirect("/")
  }
  return user
}

const getAdminUser = async () => {
  const user = await getAuthUser()
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/")
  return user
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(productSchema, rawData)

    const imageFile = formData.get("image") as File

    const result = (await uploadImage(imageFile)) as { secureUrl: string }

    await db.product.create({
      data: {
        ...validatedFields,
        image: result.secureUrl,
        clerkId: user.id,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect("/admin/products")
}

export const fetchAdminProducts = async () => {
  await getAdminUser()
  const products = db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return products
}
