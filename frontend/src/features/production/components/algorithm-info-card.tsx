import { TrendingUpIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AlgorithmInfoCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Status do Algoritmo
        </CardTitle>
        <TrendingUpIcon className="size-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">
          Otimizado
        </div>
        <p className="text-xs text-muted-foreground mt-1">Algoritmo Guloso aplicado</p>
      </CardContent>
    </Card>
  )
}
