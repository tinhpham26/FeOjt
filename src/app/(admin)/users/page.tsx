import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function UsersPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Users & Roles"
        subtitle="Manage system users and their permissions"
        actions={<Button>Create User</Button>}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Users', href: '/admin/users' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Users"
          description="Create your first user account"
          action={<Button>Create User</Button>}
        />
      </div>
    </div>
  )
}
