import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { executeQuery } from '@/lib/db/config'

/**
 * API để reset password cho admin - CHỈ DÙNG ĐỂ DEBUG/SETUP
 * POST /api/auth/reset-admin-password
 * Body: { "email": "admin@company.com", "newPassword": "Password123!" }
 */
export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json()

    if (!email || !newPassword) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Email và password mới là bắt buộc' 
        },
        { status: 400 }
      )
    }

    // Check if user exists
    const checkQuery = `
      SELECT id, email, full_name, status 
      FROM users 
      WHERE LOWER(email) = @email
    `

    const users = await executeQuery<{
      id: string
      email: string
      full_name: string
      status: string
    }>(checkQuery, { email: email.toLowerCase().trim() })

    if (users.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Không tìm thấy user với email này' 
        },
        { status: 404 }
      )
    }

    const user = users[0]

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Update password
    const updateQuery = `
      UPDATE users 
      SET password_hash = @password_hash
      WHERE id = @id
    `

    await executeQuery(updateQuery, {
      id: user.id,
      password_hash: newPasswordHash,
    })

    // Verify the update worked
    const verifyQuery = `
      SELECT password_hash FROM users WHERE id = @id
    `
    const verify = await executeQuery<{ password_hash: string }>(verifyQuery, { id: user.id })
    
    if (verify.length > 0) {
      const isMatch = await bcrypt.compare(newPassword, verify[0].password_hash)
      
      return NextResponse.json({
        success: true,
        message: 'Password đã được reset thành công',
        data: {
          email: user.email,
          fullName: user.full_name,
          status: user.status,
          passwordVerified: isMatch,
          newPasswordHashPreview: newPasswordHash.substring(0, 30) + '...'
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Password đã được update'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Đã xảy ra lỗi khi reset password',
        details: String(error)
      },
      { status: 500 }
    )
  }
}
