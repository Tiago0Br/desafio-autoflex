import { useEffect } from 'react'
import { AlgorithmInfoCard } from './components/algorithm-info-card'
import { ProductionPlanCard } from './components/production-plan-card'
import { TotalItemsCard } from './components/total-items-card'
import { TotalValueCard } from './components/total-value-card'
import { useProductionStore } from './stores/use-production-store'

export function DashboardPage() {
  const { plan, isLoading, fetchPlan } = useProductionStore()

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg text-slate-500 animate-pulse">
          Calculando o cenário de produção ideal...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard de Produção
        </h1>
        <p className="text-muted-foreground mt-2">
          Visão estratégica sugerida pelo sistema para maximização de lucros com base no
          estoque atual.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalValueCard totalValue={plan?.totalValue} />

        <TotalItemsCard totalItems={plan?.totalItems} />

        <div className="hidden lg:block">
          <AlgorithmInfoCard />
        </div>
      </div>

      <ProductionPlanCard productionList={plan?.productionList ?? []} />
    </div>
  )
}
