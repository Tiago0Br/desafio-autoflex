import { HttpResponse, http } from 'msw'
import { env } from '@/env'

export const updateProductMock = http.put(
  `${env.VITE_API_URL}/products/:productId`,
  () => {
    return new HttpResponse(null, { status: 200 })
  }
)
