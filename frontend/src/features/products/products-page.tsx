import { ProductFormDialog } from './components/product-form-dialog'
import { ProductsTable } from './components/products-table'

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Produtos</h2>

        <ProductFormDialog />
      </div>

      <ProductsTable />
    </div>
  )
}
