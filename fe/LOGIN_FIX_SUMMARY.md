# 🔧 Login Role Mapping Fix

## Vấn đề
- Trong database, tài khoản `admin@company.com` có `role_id = 1` (ADMIN)
- Khi login, hệ thống vẫn dùng tài khoản mock `admin@bhx.local` thay vì gọi API thật
- Tài khoản thật từ database không thể login vào trang admin

## Nguyên nhân
Login page đang check các tài khoản mock **TRƯỚC KHI** gọi API, bao gồm:
- `admin@bhx.local` → redirect to `/admin`
- `warehouse@bhx.local` → redirect to `/ops`
- Mọi tài khoản khác → redirect to `/customer` (không check database)

## Giải pháp đã áp dụng

### ✅ Sửa Login Page
**File: `src/app/login/page.tsx`**

#### 1. Bỏ tất cả tài khoản mock
- ❌ Xóa `admin@bhx.local`
- ❌ Xóa `warehouse@bhx.local`
- ❌ Xóa logic check localStorage demo-users
- ❌ Xóa timeout mock login

#### 2. Gọi API thật
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: emailOrPhone.trim(),
    password: password,
  }),
})
```

#### 3. Map roleId sang role string
```typescript
const mapRoleIdToRole = (roleId: number): User['role'] => {
  switch (roleId) {
    case 1: return 'ADMIN'
    case 2: return 'STORE_MANAGER'
    case 3: return 'WAREHOUSE_MANAGER'
    case 4: return 'STAFF'
    case 5: return 'CUSTOMER'
    default: return 'CUSTOMER'
  }
}
```

#### 4. Redirect dựa trên role từ database
```typescript
if (role === 'ADMIN') {
  router.push('/admin/dashboard')
} else if (role === 'STORE_MANAGER' || role === 'WAREHOUSE_MANAGER' || role === 'STAFF') {
  router.push('/ops')
} else {
  router.push('/customer')
}
```

## Database Role Mapping

| role_id | Role Name           | Frontend Route        |
|---------|---------------------|-----------------------|
| 1       | ADMIN               | /admin/dashboard      |
| 2       | STORE_MANAGER       | /ops                  |
| 3       | WAREHOUSE_MANAGER   | /ops                  |
| 4       | STAFF               | /ops                  |
| 5       | CUSTOMER            | /customer             |

## Cách test

### Bước 1: Kiểm tra database
```sql
SELECT id, email, role_id, status FROM users WHERE email = 'admin@company.com'
```
Kết quả mong đợi:
- `role_id = 1`
- `status = 'ACTIVE'`
- `password_hash` không null

### Bước 2: Test login
1. Mở trang `/login`
2. Nhập:
   - Email: `admin@company.com`
   - Password: `<your_password>`
3. Click "Đăng nhập"

### Bước 3: Kết quả mong đợi
✅ Đăng nhập thành công
✅ Redirect tới `/admin/dashboard`
✅ User role hiển thị là "ADMIN"
✅ Có đầy đủ quyền admin

## Troubleshooting

### ❌ Lỗi "Sai tài khoản hoặc mật khẩu"
**Nguyên nhân:**
- Password trong database không khớp
- Tài khoản chưa có `password_hash`

**Giải pháp:**
1. Kiểm tra xem có `password_hash` không:
```sql
SELECT email, password_hash FROM users WHERE email = 'admin@company.com'
```

2. Nếu `password_hash` là NULL, cần reset password:
```sql
-- Sử dụng bcrypt hash của password "admin123"
UPDATE users 
SET password_hash = '$2a$10$...' -- bcrypt hash
WHERE email = 'admin@company.com'
```

3. Hoặc dùng API register để tạo tài khoản mới với password

### ❌ Đăng nhập vào trang customer thay vì admin
**Nguyên nhân:**
- `role_id` trong database không phải là 1

**Giải pháp:**
```sql
-- Kiểm tra role_id
SELECT email, role_id FROM users WHERE email = 'admin@company.com'

-- Sửa role_id thành 1 (ADMIN)
UPDATE users SET role_id = 1 WHERE email = 'admin@company.com'
```

### ❌ Console log "Password verification: passwordMatch: false"
**Nguyên nhân:**
- Password nhập vào không khớp với hash trong database

**Giải pháp:**
Dùng tool test-password API:
```bash
curl -X POST http://localhost:3000/api/auth/test-password \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"your_password"}'
```

## API Response Format

### ✅ Success Response
```json
{
  "success": true,
  "message": "login successful",
  "data": {
    "id": "E0BA90BD-DBBC-4469-91AE-C657DD7CB444",
    "accessToken": "Bearer-E0BA90BD-DBBC-4469-91AE-C657DD7CB444-1738675200000",
    "fullName": "System Administrator",
    "roleId": 1
  }
}
```

### ❌ Error Response
```json
{
  "success": false,
  "message": "Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại."
}
```

## Kiểm tra trong Browser

### LocalStorage
F12 → Application → Local Storage → `auth-storage`
```json
{
  "state": {
    "user": {
      "id": "E0BA90BD-...",
      "name": "System Administrator",
      "email": "admin@company.com",
      "role": "ADMIN",
      "permissions": ["IAM_READ", "IAM_WRITE", ...]
    },
    "token": "Bearer-...",
    "isAuthenticated": true
  }
}
```

### Cookies
F12 → Application → Cookies → `http://localhost:3000`
- `auth_token`: Bearer-...
- `user_role`: ADMIN

## Notes

### ⚠️ Tài khoản mock đã bị xóa
Các tài khoản này **KHÔNG CÒN hoạt động**:
- ❌ `admin@bhx.local`
- ❌ `warehouse@bhx.local`
- ❌ `warehouse2@bhx.local`

### ✅ Chỉ dùng tài khoản từ database
Tất cả login giờ đều **GỌI API THẬT** và check database.

### 🔐 Password Security
- Password được hash bằng bcrypt với salt rounds = 10
- API so sánh password input với hash trong database
- Không lưu plain text password

## Next Steps (Optional)

1. **JWT Token**: Thay thế mock token bằng JWT token thật
2. **Token Refresh**: Implement token refresh mechanism
3. **Session Management**: Thêm session timeout
4. **Two-Factor Auth**: Thêm 2FA cho admin accounts
