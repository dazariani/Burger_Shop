"use server"
import db from "@/utils/db"
import { redirect } from "next/navigation"
import products from "@/prisma/products"
import { auth, currentUser } from "@clerk/nextjs/server"
import { productSchema, reviewSchema, validateWithZodSchema } from "./schemas"
import { deleteImage, uploadImage } from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import { Cart } from "@/generated/prisma/client"

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
    return { message: "პროდუქტი წარმატებით წაიშალა" }
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
    return { message: "პროდუქტი წარმატებით განახლდა" }
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
    return { message: favoriteId ? "წაიშალა" : "დაემატა" }
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
    return { message: "მიმოხილვა წარმატებით დაემატა" }
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
    return { message: "მიმოხილვა წარმატებით წაიშალა" }
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

// Cart actions

export const fetchCartItems = async () => {
  const userId = (await auth()).userId
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId || "",
    },
    select: {
      numItemsInCart: true,
    },
  })
  return cart?.numItemsInCart || 0
}

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    throw new Error("Product not found")
  }
  return product
}

const includeProductClause = {
  cartItems: {
    include: { product: true },
  },
}

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  })
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found")
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    })
  }
  return cart
}

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    })
  } else {
    cartItem = await db.cartItem.create({
      data: {
        productId,
        cartId,
        amount,
      },
    })
  }
}

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
  })
  let numItemsInCart = 0
  let cartTotal = 0

  for (const item of cartItems) {
    numItemsInCart += item.amount
    cartTotal += item.product.price * item.amount
  }

  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  })
  return currentCart
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  try {
    const productId = formData.get("productId") as string
    const amount = Number(formData.get("amount"))
    // first step
    await fetchProduct(productId)
    // second step
    const cart = await fetchOrCreateCart({ userId: user.id })
    // third step
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    // forth step
    await updateCart(cart)
    revalidatePath("/cart")
    return { message: "პროდუქტი დაემატა კალათაში" }
  } catch (error) {
    return renderError(error)
  }
}

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await getAuthUser()
  try {
    const cartItemId = formData.get("id") as string
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    })
    await updateCart(cart)
    revalidatePath("/cart")
    return { message: "პროდუქტი წაიშალა" }
  } catch (error) {
    return renderError(error)
  }
}

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number
  cartItemId: string
}) => {
  const user = await getAuthUser()
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    })
    await updateCart(cart)
    revalidatePath("/cart")
    return { message: "კალათა განახლდა" }
  } catch (error) {
    return renderError(error)
  }
}

// Order actions

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  let orderId: null | string = null
  let cartId: null | string = null

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })
    cartId = cart.id

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    })

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    })
    orderId = order.id
  } catch (error) {
    return renderError(error)
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`)
}

export const fetchUserOrders = async () => {
  const user = await getAuthUser()
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return orders
}

export const fetchAdminOrders = async () => {
  await getAdminUser()
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return orders
}
