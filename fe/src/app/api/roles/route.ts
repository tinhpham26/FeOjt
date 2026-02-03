import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db/config'

// GET /api/roles - Get all roles
export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT 
        id,
        name,
        description,
        is_system,
        created_at as createdAt
      FROM roles
      ORDER BY id
    `

    const roles = await executeQuery(query)

    return NextResponse.json(roles)
  } catch (error) {
    console.error('Get roles error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}
