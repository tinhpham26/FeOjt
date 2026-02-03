import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function CustomerOrdersPage() {
  return (
    <div className="py-8 px-6">
      <PageHeader
        title="My Orders"
        subtitle="Track your online orders"
        breadcrumbs={[
          { label: 'Home', href: '/customer' },
          { label: 'Orders', href: '/customer/orders' },
        ]}
      />

      <div className="card">
        <EmptyState title="No Orders Yet" description="You haven't placed any orders yet. Start shopping now!" action={<Button>Browse Products</Button>} />
      </div>
    </div>
  )
}


