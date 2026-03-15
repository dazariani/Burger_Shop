"use server"

import db from "@/utils/db"
import { redirect } from "next/navigation"
import products from "@/prisma/products"
import { currentUser } from "@clerk/nextjs/server"
import { productSchema, reviewSchema, validateWithZodSchema } from "./schemas"
import { deleteImage, uploadImage } from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const createProductFromList = async () => {
  "use server"
  for (const product of products) {
    await db.product.create({
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

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState
  await getAdminUser()
  try {
    const deletedProduct = await db.product.delete({
      where: {
        id: productId,
      },
    })

    await deleteImage(deletedProduct.image)
    revalidatePath("/admin/products")
    return { message: "Product deleted successfully" }
  } catch (error) {
    return renderError(error)
  }
}
export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser()
  const product = await db.product.findUnique({
    where: { id: productId },
  })
  if (!product) redirect("/admin/products")
  return product
}

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  await getAdminUser()
  try {
    const productId = formData.get("id") as string
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(productSchema, rawData)
    const currentImage = formData.get("curImg") as string
    const newImgFile = formData.get("image") as File

    let newImage = { secureUrl: "" }

    // If new image newImgFile exists, upload to cloudinary
    if (newImgFile.size > 0) {
      newImage = (await uploadImage(newImgFile)) as { secureUrl: string }
    }

    await db.product.update({
      where: { id: productId },
      data: {
        ...validatedFields,
        image: newImgFile.size > 0 ? newImage.secureUrl : currentImage,
      },
    })

    // When old image link updated in database with new, delete old from cloudinary
    if (newImgFile.size > 0) deleteImage(currentImage)

    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: "Product updated successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser()

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
  productId: string
  favoriteId: string | null
  pathname: string
}) => {
  const user = await getAuthUser()
  const { productId, favoriteId, pathname } = prevState

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      })
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      })
    }
    revalidatePath(pathname)
    return { message: favoriteId ? "removed" : "added" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchUserFavorites = async () => {
  const user = await getAuthUser()
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })
  return favorites
}

export const createReviewAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(reviewSchema, rawData)

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    })
    revalidatePath(`/products/${validatedFields.productId}`)
    return { message: "review submitted successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
  })

  return reviews
}

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser()
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })
  return reviews
}
export const deleteReviewAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await getAuthUser()
  const revId = formData.get("id") as string
  try {
    await db.review.delete({
      where: {
        id: revId,
      },
    })
    revalidatePath("/reviews")
    return { message: "review removed successfully" }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductRating = async ({
  productId,
}: {
  productId: string
}) => {
  const productReviews = await db.product.findMany({
    where: {
      id: productId,
    },

    include: {
      reviews: true,
    },
  })
  return productReviews
}
