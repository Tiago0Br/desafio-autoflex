import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import type { RawMaterial } from '@/types'
import { type MaterialFormValues, materialFormSchema } from '../schemas/material.schema'
import { useMaterialStore } from '../stores/use-material-store'

interface MaterialFormDialogProps {
  trigger: React.ReactNode
  material?: RawMaterial
}

export function MaterialFormDialog({ trigger, material }: MaterialFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isEditing = !!material

  const { createMaterial, updateMaterial } = useMaterialStore()

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      name: material?.name ?? '',
      stockQuantity: material?.stockQuantity ?? 0
    }
  })

  useEffect(() => {
    if (material) {
      form.reset({
        name: material.name,
        stockQuantity: material.stockQuantity
      })
    }
  }, [material, form])

  const onSubmit = async ({ name, stockQuantity }: MaterialFormValues) => {
    if (isEditing && material?.id) {
      await updateMaterial(material.id, {
        name,
        stockQuantity
      })
      toast.success('Matéria-prima atualizada com sucesso!')
    } else {
      await createMaterial({
        name,
        stockQuantity
      })
      toast.success('Matéria-prima cadastrada com sucesso!')
    }

    form.reset()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Atualizar Matéria-Prima' : 'Cadastrar Nova Matéria-Prima'}
          </DialogTitle>
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
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
