import { NextRequest, NextResponse } from 'next/server'
import { getDbConnection, executeQuery } from '@/lib/db/config'
import bcrypt from 'bcryptjs'
import { rolePermissions } from '@/shared/auth/permission-map'

interface LoginRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Email và mật khẩu là bắt buộc' 
        },
        { status: 400 }
      )
    }

    // Query user from database
    const emailLower = email.toLowerCase().trim()
    const query = `
      SELECT 
        u.id,
        u.email,
        u.password_hash,
        u.full_name,
        u.status,
        u.role_id,
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
      role_id: number
      role_name: string
    }>(query, { email: emailLower })

    console.log('🔍 Login attempt:', {
      email: emailLower,
      found: users.length > 0,
      status: users[0]?.status,
      hasPasswordHash: !!users[0]?.password_hash
    })

    if (users.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.' 
        },
        { status: 401 }
      )
    }

    const user = users[0]

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Tài khoản đã bị vô hiệu hóa' 
        },
        { status: 403 }
      )
    }

    // Verify password
    if (!user.password_hash) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Tài khoản chưa được thiết lập mật khẩu' 
        },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    console.log('🔐 Password verification:', {
      email: user.email,
      passwordMatch: isValidPassword,
      passwordLength: password.length
    })
    
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.' 
        },
        { status: 401 }
      )
    }

    // Return user data in BE format
    return NextResponse.json({
      success: true,
      message: 'login successful',
      data: {
        id: user.id,
        accessToken: `Bearer-${user.id}-${Date.now()}`, // TODO: Generate proper JWT
        fullName: user.full_name || user.email,
        roleId: user.role_id,
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng nhập' },
      { status: 500 }
    )
  }
} 
     
