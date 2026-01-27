import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'

export default function ProductsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Products"
        subtitle="Manage product catalog"
        actions={<Button>Create Product</Button>}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Catalog', href: '/admin/catalog' },
          { label: 'Products', href: '/admin/catalog/products' },
        ]}
      />

      <div className="card">
        <EmptyState
          title="No Products"
          description="Add your first product to the catalog"
          action={<Button>Create Product</Button>}
        />
      </div>
    </div>
  )
}
