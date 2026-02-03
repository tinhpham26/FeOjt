import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { executeQuery } from '@/lib/db/config'

// API để test password - CHỈ DÙNG ĐỂ DEBUG
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const query = `
      SELECT 
        u.email,
        u.password_hash,
        u.full_name,
        u.status
      FROM users u
      WHERE LOWER(u.email) = @email
    `

    const users = await executeQuery<{
      email: string
      password_hash: string
      full_name: string
      status: string
    }>(query, { email: email.toLowerCase() })

    if (users.length === 0) {
      return NextResponse.json({
        found: false,
        message: 'User not found'
      })
    }

    const user = users[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)

    return NextResponse.json({
      found: true,
      email: user.email,
      fullName: user.full_name,
      status: user.status,
      passwordMatch: isMatch,
      passwordHashPreview: user.password_hash.substring(0, 30) + '...'
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
