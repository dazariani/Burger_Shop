import axios from "axios"

export const apiCall = async (order_id: string, cart_id: string) => {
  const response = await axios.post("/api/payment", {
    orderId: order_id,
    cartId: cart_id,
  })
  return response
}
