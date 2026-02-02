import { redirect } from 'next/navigation'

export default function AdminUsersAliasPage() {
  // In kiến trúc hiện tại, các trang admin thật nằm trong route group (admin)
  // nên URL thực tế là /users. File này chỉ để alias /admin/users -> /users.
  redirect('/users')
}


