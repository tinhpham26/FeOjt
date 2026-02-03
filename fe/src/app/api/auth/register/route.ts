import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db/config'
import bcrypt from 'bcryptjs'

interface RegisterRequest {
  fullName: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()
    const { fullName, email, phone, password, confirmPassword } = body

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Mật khẩu xác nhận không khớp' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const emailCheck = await executeQuery<{ count: number }>(
      'SELECT COUNT(*) as count FROM users WHERE LOWER(email) = @email',
      { email: email.toLowerCase().trim() }
    )

    if (emailCheck[0].count > 0) {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 409 }
      )
    }

    // Check if phone already exists (if provided)
    if (phone) {
      const phoneCheck = await executeQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM users WHERE phone = @phone',
        { phone: phone.trim() }
      )

      if (phoneCheck[0].count > 0) {
        return NextResponse.json(
          { error: 'Số điện thoại đã được sử dụng' },
          { status: 409 }
        )
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    console.log('🔐 Register - Password hash generated:', {
      email: email.toLowerCase().trim(),
      hashLength: passwordHash.length,
      hashPreview: passwordHash.substring(0, 20) + '...'
    })

    // Insert new user with Customer role (role_id = 6)
    const insertQuery = `
      INSERT INTO users (id, email, password_hash, full_name, phone, role_id, status, email_verified)
      OUTPUT INSERTED.id, INSERTED.email, INSERTED.full_name, INSERTED.phone
      VALUES (NEWID(), @email, @passwordHash, @fullName, @phone, 6, 'ACTIVE', 0)
    `

    const result = await executeQuery<{
      id: string
      email: string
      full_name: string
      phone: string | null
    }>(insertQuery, {
      email: email.toLowerCase().trim(),
      passwordHash,
      fullName: fullName.trim(),
      phone: phone?.trim() || null,
    })

    console.log('✅ User created successfully:', result[0].email)

    const newUser = result[0]

    return NextResponse.json(
      {
        message: 'Đăng ký tài khoản thành công',
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.full_name,
          phone: newUser.phone,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    )
  }
}
