import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function DeliveryPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Delivery"
        subtitle="Track and manage deliveries"
        actions={<Button>Create Delivery</Button>}
        breadcrumbs={[
          { label: 'Dashboard', href: '/ops' },
          { label: 'Delivery', href: '/ops/delivery' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Deliveries"
          description="Create your first delivery record"
          action={<Button>Create Delivery</Button>}
        />
      </div>
    </div>
  )
}
