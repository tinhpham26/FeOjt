import { PageHeader } from '@/shared/ui/PageHeader'
import { DashboardKpis } from '@/features/reporting/components/admin/DashboardKpis'
import { RecentActivityPanel } from '@/features/reporting/components/admin/RecentActivityPanel'
import { SystemAlertsPanel } from '@/features/reporting/components/admin/SystemAlertsPanel'
import { QuickActions } from '@/features/reporting/components/admin/QuickActions'
import { ModuleShortcuts } from '@/features/reporting/components/admin/ModuleShortcuts'

export default function AdminDashboard() {
  return (
    <div className="px-6 py-6">
      {/* A) Page header */}
      <PageHeader
        title="Admin Console"
        subtitle="Quản trị hệ thống chuỗi bán lẻ"
        actions={
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Hôm nay
          </span>
        }
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* B) KPI cards */}
        <DashboardKpis />

        {/* C) Two-column panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <RecentActivityPanel />
          </div>
          <div className="lg:col-span-1">
            <SystemAlertsPanel />
          </div>
        </div>

        {/* D) Quick actions */}
        <QuickActions />

        {/* E) Module shortcuts */}
        <ModuleShortcuts />
      </div>
    </div>
  )
}
