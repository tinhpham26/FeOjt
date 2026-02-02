import { redirect } from 'next/navigation'

export default function AdminInventoryAliasPage() {
  // Alias /admin/inventory -> route group (admin)/inventory
  redirect('/inventory')
}

