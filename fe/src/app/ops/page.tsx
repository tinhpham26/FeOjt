import { redirect } from 'next/navigation'

export default function OpsHome() {
  // Ops home redirects to inventory page in (ops) route group
  // The middleware ensures only ops users can access this
  redirect('/ops/inventory')
}


