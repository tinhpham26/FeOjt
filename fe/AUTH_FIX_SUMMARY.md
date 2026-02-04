# 🔧 Authentication Persistence Fix

## Vấn đề
Người dùng bị tự động logout khi điều hướng từ trang Profile về trang Home.

## Nguyên nhân
1. Auth state chỉ được lưu trong memory (Zustand store mặc định)
2. Khi navigate giữa các routes, state có thể bị mất
3. Component `AuthReset` đã được thiết kế để force logout mỗi lần app reload

## Các thay đổi đã thực hiện

### 1. ✅ Thêm Persistence cho Auth Store
**File: `src/store/auth.store.ts`**
- Sử dụng `zustand/middleware` với `persist` để lưu auth state vào localStorage
- Auth state (user, token) giờ được persist qua page refreshes và navigation
- Tự động set cookies (`auth_token`, `user_role`) khi login để middleware hoạt động
- Cookies được clear khi logout

**Những gì được persist:**
- `user`: Thông tin người dùng
- `token`: Authentication token
- `isAuthenticated`: Trạng thái đăng nhập

### 2. ✅ Vô hiệu hóa AuthReset
**File: `src/shared/auth/AuthReset.tsx`**
- Component này đã được disable
- Không còn force logout mỗi khi app reload
- Users giờ sẽ duy trì login state qua các page navigation và refresh

### 3. ✅ Cập nhật Providers
**File: `src/app/providers.tsx`**
- Thêm hydration logic cho auth store
- Đảm bảo không có hydration mismatch giữa server và client

## Cách test

### Bước 1: Restart Dev Server
```bash
npm run dev
```

### Bước 2: Test Flow
1. Đăng nhập vào hệ thống (ví dụ: tài khoản customer)
2. Vào trang Profile (`/customer/profile`)
3. Bấm nút "Home" để về trang chủ (`/`)
4. ✅ **Kết quả mong đợi**: Vẫn đăng nhập, không bị logout

### Bước 3: Test Persistence
1. Đăng nhập
2. Refresh trang (F5)
3. ✅ **Kết quả mong đợi**: Vẫn đăng nhập sau refresh

### Bước 4: Test Logout
1. Đăng nhập
2. Click vào dropdown user menu
3. Click "Đăng xuất"
4. ✅ **Kết quả mong đợi**: Đăng xuất thành công, về trang home

## Technical Details

### localStorage Key
Auth state được lưu trong localStorage với key: `auth-storage`

### Cookie Names
- `auth_token`: Authentication token (expires after 7 days)
- `user_role`: User role for middleware routing (expires after 7 days)

### Middleware Integration
Middleware (`src/app/middleware.ts`) vẫn hoạt động như cũ, check cookies để:
- Redirect về `/login` nếu truy cập protected routes mà chưa login
- Cho phép truy cập public routes (`/`, `/login`, etc.) không cần auth

## Troubleshooting

### Nếu vẫn bị logout:
1. Kiểm tra console log xem có errors không
2. Kiểm tra localStorage (F12 → Application → Local Storage)
   - Phải có key `auth-storage`
3. Kiểm tra cookies (F12 → Application → Cookies)
   - Phải có `auth_token` và `user_role`

### Clear auth manually:
```javascript
// Trong browser console:
localStorage.removeItem('auth-storage')
document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
```

## Next Steps (Optional Improvements)

1. **Token Refresh**: Implement token refresh logic khi token gần expire
2. **API Integration**: Kết nối với backend API thực tế thay vì mock data
3. **Secure Cookies**: Sử dụng httpOnly cookies cho production
4. **Session Timeout**: Thêm logic tự động logout sau thời gian không hoạt động
