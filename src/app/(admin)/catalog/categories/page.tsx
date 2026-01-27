import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function CategoriesPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Categories"
        subtitle="Manage product categories"
        actions={<Button>Create Category</Button>}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Catalog', href: '/admin/catalog' },
          { label: 'Categories', href: '/admin/catalog/categories' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Categories"
          description="Create your first product category"
          action={<Button>Create Category</Button>}
        />
      </div>
    </div>
  )
}
