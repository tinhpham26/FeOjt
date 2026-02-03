import { redirect } from 'next/navigation'

export default function CustomersPage() {
  // Keep /customers (route group) as an alias → /admin/customers
  redirect('/admin/customers')
}
