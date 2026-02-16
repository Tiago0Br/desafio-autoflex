import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { useProductStore } from '@/store/use-product-store'
import { useEffect } from 'react'

export function ProductsTable() {
  const { products, isLoading: isLoadingProducts, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ingredientes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoadingProducts ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Carregando...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Nenhum produto cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.composition.map((c) => (
                    <span
                      key={c.id as number}
                      className="inline-block bg-slate-100 rounded-full px-2 py-1 text-xs font-semibold text-slate-600 mr-2 mb-1"
                    >
                      {c.rawMaterial.name} ({c.quantityRequired}x)
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
