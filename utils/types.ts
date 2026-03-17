/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma } from "@/generated/prisma/client"

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>

export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string }>

export type CartItem = {
  productId: string
  image: string
  title: string
  price: string
  amount: number
  company: string
}

export type CartState = {
  cartItems: CartItem[]
  numItemsInCart: number
  cartTotal: number
  shipping: number
  tax: number
  orderTotal: number
}

export type ReviewAndProduct = {
  product: {
    clerkId: string
    id: string
    name: string
    description: string
    featured: boolean
    price: number
    category: string
    image: string
    createdAt: Date
    updatedAt: Date
  }
} & {
  authorName: string
  authorImageUrl: string
  rating: number
  comment: string
  productId: string
  clerkId: string
  id: string
  createdAt: Date
  updatedAt: Date
}

export type Review = {
  authorName: string
  authorImageUrl: string
  rating: number
  comment: string
  productId: string
  clerkId: string
  id: string
  createdAt: Date
  updatedAt: Date
}

export type productReviews = ({
  reviews: {
    productId: string
    clerkId: string
    id: string
    createdAt: Date
    updatedAt: Date
    authorName: string
    authorImageUrl: string
    rating: number
    comment: string
  }[]
} & {
  clerkId: string
  id: string
  name: string
  description: string
  featured: boolean
  price: number
  category: string
  image: string
  createdAt: Date
  updatedAt: Date
})[]
