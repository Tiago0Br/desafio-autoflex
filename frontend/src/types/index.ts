export interface RawMaterial {
  id?: number
  name: string
  stockQuantity: number
}

export interface CompositionItem {
  rawMaterialId: number
  quantity: number
}

export interface Product {
  id?: number
  name: string
  price: number
  composition: {
    id?: number
    rawMaterial: RawMaterial
    quantityRequired: number
  }[]
}

export interface ProductionItem {
  productName: string
  quantityToProduce: number
  unitPrice: number
  subTotal: number
}

export interface ProductionPlan {
  productionList: ProductionItem[]
  totalValue: number
  totalItems: number
}
