import { PageHeader } from '@/shared/ui/PageHeader'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function CustomerProfilePage() {
  return (
    <div className="py-8 px-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your personal information"
        breadcrumbs={[
          { label: 'Home', href: '/customer' },
          { label: 'Profile', href: '/customer/profile' },
        ]}
      />

      <div className="card">
        <EmptyState title="Profile Settings" description="Profile editing will be available when backend API is connected." />
      </div>
    </div>
  )
}


