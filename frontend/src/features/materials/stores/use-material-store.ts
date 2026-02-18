import { toast } from 'sonner'
import { create } from 'zustand'
import { api, getErrorMessageByError } from '@/services/api'
import type { RawMaterial, SaveRawMaterial } from '@/types'

interface MaterialStore {
  materials: RawMaterial[]
  isLoading: boolean
  fetchMaterials: () => Promise<void>
  createMaterial: (material: SaveRawMaterial) => Promise<void>
  updateMaterial: (materialId: number, material: SaveRawMaterial) => Promise<void>
  deleteMaterial: (materialId: number) => Promise<void>
}

export const useMaterialStore = create<MaterialStore>((set) => ({
  materials: [],
  isLoading: false,

  fetchMaterials: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/raw-materials')
      set({ materials: response.data, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  createMaterial: async (material) => {
    try {
      await api.post('/raw-materials', material)
      useMaterialStore.getState().fetchMaterials()
      toast.success('Matéria-prima cadastrada com sucesso!')
    } catch (error) {
      toast.error(getErrorMessageByError(error))
    }
  },

  updateMaterial: async (materialId, material) => {
    try {
      await api.put(`/raw-materials/${materialId}`, material)
      useMaterialStore.getState().fetchMaterials()
      toast.success('Matéria-prima atualizada com sucesso!')
    } catch (error) {
      toast.error(getErrorMessageByError(error))
    }
  },

  deleteMaterial: async (materialId) => {
    set({ isLoading: true })
    try {
      await api.delete(`/raw-materials/${materialId}`)
      set((state) => ({
        materials: state.materials.filter((material) => material.id !== materialId),
        isLoading: false
      }))
      toast.success('Matéria-prima deletada!')
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  }
}))
