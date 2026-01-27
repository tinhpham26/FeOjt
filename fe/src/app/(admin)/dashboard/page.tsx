import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="System-wide management and analytics"
        actions={<Button>Generate Report</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: '2,345', change: '+15% this month' },
          { title: 'Total Orders', value: '12,456', change: '+32% this month' },
          { title: 'Revenue', value: '$456,789', change: '+28% this month' },
          { title: 'Stores', value: '45', change: '+3 locations' },
        ].map((stat, idx) => (
          <div key={idx} className="card">
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">API Gateway</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Database</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Cache Layer</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">User john.doe created new role</p>
            <p className="text-gray-600">Product SKU-001 quantity updated</p>
            <p className="text-gray-600">Promotion PRO-2024-001 activated</p>
            <p className="text-gray-600">Shift assigned to staff member</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Button variant="outline" fullWidth className="justify-start">
              📊 View All Reports
            </Button>
            <Button variant="outline" fullWidth className="justify-start">
              👥 Manage Users
            </Button>
            <Button variant="outline" fullWidth className="justify-start">
              ⚙️ System Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
