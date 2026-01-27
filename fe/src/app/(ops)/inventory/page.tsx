import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function InventoryPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Inventory"
        subtitle="Manage stock levels and adjustments"
        actions={<Button>Adjust Stock</Button>}
        breadcrumbs={[
          { label: 'Dashboard', href: '/ops' },
          { label: 'Inventory', href: '/ops/inventory' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Inventory Records"
          description="Start tracking inventory for your products"
          action={<Button>Add Inventory</Button>}
        />
      </div>
    </div>
  )
}
