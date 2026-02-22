import { api } from '@/services/api'
import type { Product } from '@/types'

export async function getAllProductsRequest() {
  const response = await api.get<Product[]>('/products')

  return response.data
}
