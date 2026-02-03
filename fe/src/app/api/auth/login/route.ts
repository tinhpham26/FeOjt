import { NextRequest, NextResponse } from 'next/server'
import { getDbConnection, executeQuery } from '@/lib/db/config'
import bcrypt from 'bcryptjs'
import { rolePermissions } from '@/shared/auth/permission-map'

interface LoginRequest {
  emailOrPhone: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { emailOrPhone, password } = body

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { error: 'Email/Phone and password are required' },
        { status: 400 }
      )
    }

    // Query user from database
    const emailLower = emailOrPhone.toLowerCase().trim()
    const query = `
      SELECT 
        u.id,
        u.email,
        u.password_hash,
        u.full_name,
        u.status,
        r.name as role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE LOWER(u.email) = @email
    `

    const users = await executeQuery<{
      id: string
      email: string
      password_hash: string | null
      full_name: string | null
      status: string
      role_name: string
    }>(query, { email: emailLower })

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.' },
        { status: 401 }
      )
    }

    const user = users[0]

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Tài khoản đã bị vô hiệu hóa' },
        { status: 403 }
      )
    }

    // Verify password
    if (user.password_hash) {
      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.' },
          { status: 401 }
        )
      }
    } else {
      // For demo accounts without password hash, allow direct password check
      // TODO: Remove this in production
      if (password !== 'admin123' && password !== 'warehouse123') {
        return NextResponse.json(
          { error: 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.' },
          { status: 401 }
        )
      }
    }

    // Map role name to UserRole type
    const roleMap: Record<string, string> = {
      ADMIN: 'ADMIN',
      STORE_MANAGER: 'STORE_MANAGER',
      WAREHOUSE_MANAGER: 'WAREHOUSE_MANAGER',
      STORE_STAFF: 'STAFF',
      WAREHOUSE_STAFF: 'STAFF',
      CUSTOMER: 'CUSTOMER',
    }

    const role = roleMap[user.role_name] || 'CUSTOMER'

    // Return user data
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.full_name || user.email,
        email: user.email,
        role,
        permissions: rolePermissions[role as keyof typeof rolePermissions] || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: `token-${user.id}`, // TODO: Generate JWT token
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng nhập' },
      { status: 500 }
    )
  }
}


