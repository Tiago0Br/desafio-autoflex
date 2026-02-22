import { api } from '@/services/api'
import type { SaveProduct } from '@/types'

interface UpdateProductRequestBody {
  productId: number
  product: SaveProduct
}

export function updateProductRequest({ productId, product }: UpdateProductRequestBody) {
  return api.put(`/products/${productId}`, product)
}
