import { HttpResponse, http } from 'msw'
import { env } from '@/env'

export const createProductMock = http.post(`${env.VITE_API_URL}/products`, () => {
  return new HttpResponse(null, { status: 201 })
})
