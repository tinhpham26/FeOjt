import { PageHeader } from '@/shared/ui/PageHeader'
import { Button } from '@/shared/ui/Button'

export default function CustomerLoyaltyPage() {
  return (
    <div className="py-8 px-6">
      <PageHeader
        title="My Loyalty Points"
        subtitle="View your rewards and redeem points"
        breadcrumbs={[
          { label: 'Home', href: '/customer' },
          { label: 'Loyalty', href: '/customer/loyalty' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <p className="text-gray-600 text-sm font-medium">Available Points</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">1,250</p>
        </div>
        <div className="card text-center">
          <p className="text-gray-600 text-sm font-medium">Lifetime Points</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">5,430</p>
        </div>
        <div className="card text-center">
          <p className="text-gray-600 text-sm font-medium">Tier</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">Gold</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Earn Points</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• 1 point per $1 spent</li>
          <li>• Bonus points for special promotions</li>
          <li>• Double points on weekends</li>
          <li>• Birthday bonus: 50 points</li>
        </ul>
        <Button fullWidth className="mt-6">
          Browse Rewards
        </Button>
      </div>
    </div>
  )
}
