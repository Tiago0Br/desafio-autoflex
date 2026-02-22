import { HttpResponse, http } from 'msw'
import { env } from '@/env'

export const deleteProductMock = http.delete(
  `${env.VITE_API_URL}/products/:productId`,
  () => {
    return new HttpResponse(null, { status: 204 })
  }
)
