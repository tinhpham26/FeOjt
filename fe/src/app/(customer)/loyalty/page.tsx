import { PageHeader } from '@/shared/ui/PageHeader'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function CustomerLoyaltyPage() {
  return (
    <div className="py-8 px-6">
      <PageHeader
        title="Loyalty"
        subtitle="Your points and rewards"
        breadcrumbs={[
          { label: 'Home', href: '/customer' },
          { label: 'Loyalty', href: '/customer/loyalty' },
        ]}
      />

      <div className="card">
        <EmptyState title="No Loyalty Data" description="Your loyalty points will appear here after your first purchase." />
      </div>
    </div>
  )
}


