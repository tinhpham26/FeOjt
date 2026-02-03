import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function CustomerDashboardPage() {
  return (
    <div className="py-8 px-6">
      <PageHeader
        title="Customer Dashboard"
        subtitle="Welcome to your account"
        breadcrumbs={[{ label: 'Home', href: '/customer' }]}
      />

      <div className="card">
        <EmptyState title="No Data Yet" description="Start exploring products and place your first order." action={<Button>Browse Products</Button>} />
      </div>
    </div>
  )
}


