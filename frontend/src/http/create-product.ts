import { api } from '@/services/api'
import type { SaveProduct } from '@/types'

interface CreateProductRequestBody {
  product: SaveProduct
}

export function createProductRequest({ product }: CreateProductRequestBody) {
  return api.post('/products', product)
}
