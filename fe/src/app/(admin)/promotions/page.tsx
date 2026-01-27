import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function PromotionsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Promotions"
        subtitle="Create and manage promotional campaigns"
        actions={<Button>Create Promotion</Button>}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Promotions', href: '/admin/promotions' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Promotions"
          description="Create your first promotion campaign"
          action={<Button>Create Promotion</Button>}
        />
      </div>
    </div>
  )
}
