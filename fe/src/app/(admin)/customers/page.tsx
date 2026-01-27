import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function CustomersPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Customers"
        subtitle="Manage customer data and profiles"
        actions={<Button>Import Customers</Button>}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Customers', href: '/admin/customers' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Customers"
          description="Customers will appear here once they register or are imported"
        />
      </div>
    </div>
  )
}
