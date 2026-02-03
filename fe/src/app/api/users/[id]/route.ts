import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db/config'
import bcrypt from 'bcryptjs'

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const query = `
      SELECT 
        u.id,
        u.email,
        u.full_name as name,
        u.status,
        r.name as role,
        u.created_at as createdAt
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = @id
    `

    const users = await executeQuery(query, { id: params.id })

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(users[0])
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, email, password, role, status } = body

    // Get role_id if role is provided
    let roleId = null
    if (role) {
      const roleQuery = `SELECT id FROM roles WHERE name = @role`
      const roles = await executeQuery<{ id: string }>(roleQuery, { role })
      if (roles.length > 0) {
        roleId = roles[0].id
      }
    }

    // Build update query dynamically
    const updates: string[] = []
    const params: Record<string, any> = { id: params.id }

    if (name) {
      updates.push('full_name = @name')
      params.name = name
    }
    if (email) {
      updates.push('email = @email')
      params.email = email
    }
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10)
      updates.push('password_hash = @password_hash')
      params.password_hash = passwordHash
    }
    if (roleId) {
      updates.push('role_id = @role_id')
      params.role_id = roleId
    }
    if (status) {
      updates.push('status = @status')
      params.status = status
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    const updateQuery = `
      UPDATE users
      SET ${updates.join(', ')}
      OUTPUT INSERTED.id, INSERTED.email, INSERTED.full_name, INSERTED.status, INSERTED.created_at
      WHERE id = @id
    `

    const result = await executeQuery<{
      id: string
      email: string
      full_name: string
      status: string
      created_at: string
    }>(updateQuery, params)

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const updatedUser = result[0]

    // Get role name
    const roleQuery = roleId 
      ? `SELECT name FROM roles WHERE id = @role_id`
      : `SELECT r.name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = @id`
    
    const roleParams = roleId ? { role_id: roleId } : { id: params.id }
    const roles = await executeQuery<{ name: string }>(roleQuery, roleParams)
    const roleName = roles[0]?.name || role

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.full_name,
      email: updatedUser.email,
      role: roleName,
      status: updatedUser.status,
      createdAt: updatedUser.created_at,
    })
  } catch (error: any) {
    console.error('Update user error:', error)
    
    if (error.number === 2627 || error.message?.includes('UNIQUE')) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleteQuery = `DELETE FROM users WHERE id = @id`

    await executeQuery(deleteQuery, { id: params.id })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}


