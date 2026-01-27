import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'

export default function AdminReportsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="System-wide business intelligence and insights"
        actions={<Button>Export All</Button>}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Reports', href: '/admin/reports' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'Sales Report', description: 'Revenue analysis and trends' },
          { title: 'Inventory Report', description: 'Stock movement and levels' },
          { title: 'Order Report', description: 'Order volume and patterns' },
          { title: 'Customer Report', description: 'Customer demographics and activity' },
          { title: 'Staff Performance', description: 'Employee metrics and KPIs' },
          { title: 'Financial Report', description: 'Detailed financial analytics' },
        ].map((report, idx) => (
          <div key={idx} className="card">
            <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{report.description}</p>
            <Button variant="outline" fullWidth className="mt-4">
              Generate
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
