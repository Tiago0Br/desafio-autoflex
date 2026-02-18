import { toast } from 'sonner'
import { create } from 'zustand'
import { api, getErrorMessageByError } from '@/services/api'
import type { Product, SaveProduct } from '@/types'

interface ProductStore {
  products: Product[]
  isLoading: boolean
  fetchProducts: () => Promise<void>
  createProduct: (product: SaveProduct) => Promise<void>
  updateProduct: (productId: number, product: SaveProduct) => Promise<void>
  deleteProduct: (productId: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/products')
      set({ products: response.data, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  createProduct: async (productData) => {
    try {
      await api.post('/products', productData)
      useProductStore.getState().fetchProducts()
      toast.success('Produto cadastrado com sucesso!')
    } catch (error) {
      toast.error(getErrorMessageByError(error))
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      await api.put(`/products/${productId}`, productData)
      useProductStore.getState().fetchProducts()
      toast.success('Produto atualizado com sucesso!')
    } catch (error) {
      toast.error(getErrorMessageByError(error))
    }
  },

  deleteProduct: async (productId) => {
    try {
      await api.delete(`/products/${productId}`)
      useProductStore.getState().fetchProducts()
      toast.success('Produto deletado!')
    } catch (error) {
      toast.error(getErrorMessageByError(error))
    }
  }
}))
