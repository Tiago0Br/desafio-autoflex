import { useEffect, useState } from 'react'
import { useMaterialStore } from '../store/use-material-store'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v3'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  stockQuantity: z.coerce
    .number({ message: 'A quantidade é obrigatória' })
    .min(0, 'O estoque não pode ser negativo.')
})

type MaterialFormValues = z.infer<typeof formSchema>

export function MaterialsPage() {
  const { materials, isLoading, fetchMaterials, createMaterial } = useMaterialStore()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  const onSubmit = async ({ name, stockQuantity }: MaterialFormValues) => {
    await createMaterial({
      name,
      stockQuantity
    })

    form.reset()
    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Matérias-Primas
        </h2>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 size-4" /> Novo Insumo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Matéria-Prima</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Insumo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Farinha de Trigo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade em Estoque</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 150" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Insumo</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Nome do Insumo</TableHead>
              <TableHead className="text-right">Qtd. em Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                  Carregando dados do servidor...
                </TableCell>
              </TableRow>
            ) : materials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                  Nenhum insumo cadastrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.id}</TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell className="text-right">{material.stockQuantity}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
