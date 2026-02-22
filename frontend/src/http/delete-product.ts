import { api } from '@/services/api'

interface DeleteProductRequestParams {
  productId: number
}

export function deleteProductRequest({ productId }: DeleteProductRequestParams) {
  return api.delete(`/products/${productId}`)
}
