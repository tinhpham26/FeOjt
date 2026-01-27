import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function ShiftsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Shifts"
        subtitle="Manage staff shifts and schedules"
        actions={<Button>Create Shift</Button>}
        breadcrumbs={[
          { label: 'Dashboard', href: '/ops' },
          { label: 'Shifts', href: '/ops/shifts' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Shifts"
          description="Create your first shift schedule"
          action={<Button>Create Shift</Button>}
        />
      </div>
    </div>
  )
}
