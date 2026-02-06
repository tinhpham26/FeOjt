# Hướng dẫn sử dụng Giỏ hàng mới

## Tổng quan
Hệ thống giỏ hàng đã được thiết kế lại hoàn toàn với:
- ✅ Quản lý state với Zustand (không còn hardcode)
- ✅ Lưu trữ giỏ hàng vào localStorage (persist)
- ✅ Thiết kế giống Bách Hóa Xanh thật
- ✅ Trang giỏ hàng đầy đủ với dark theme
- ✅ Tính năng thêm/xóa/cập nhật số lượng sản phẩm
- ✅ Tính tổng tiền, tiết kiệm, voucher

## Các file đã tạo/cập nhật

### 1. Cart Store - `src/store/cart.store.ts`
Store quản lý toàn bộ state của giỏ hàng:
- `items`: Danh sách sản phẩm trong giỏ
- `addItem()`: Thêm sản phẩm vào giỏ
- `removeItem()`: Xóa sản phẩm khỏi giỏ
- `updateQuantity()`: Cập nhật số lượng
- `clearCart()`: Xóa toàn bộ giỏ hàng
- `getTotalItems()`: Tổng số sản phẩm
- `getTotalPrice()`: Tổng giá trị đơn hàng
- `getSavings()`: Tổng tiết kiệm

### 2. Cart Page - `src/app/customer/cart/page.tsx`
Trang giỏ hàng đầy đủ với:
- Dark theme (background đen)
- Hiển thị cửa hàng
- Checkbox chọn sản phẩm
- Điều chỉnh số lượng (+/-)
- Xóa sản phẩm
- Tính tổng thanh toán
- Phần "Có thể bạn cũng thích"

### 3. Header - `src/shared/ui/Header/Header.tsx`
Cập nhật để:
- Sử dụng cart store thay vì hardcode
- Hiển thị số lượng sản phẩm động
- Preview giỏ hàng khi hover/click
- Tính tổng tiền real-time

### 4. ProductBlock - `src/features/catalog/components/ProductBlock.tsx`
Thêm chức năng:
- Nút "Thêm vào giỏ" thực sự hoạt động
- Hiển thị "Đã thêm" sau khi thêm sản phẩm
- Tích hợp với cart store

### 5. CartDrawer - `src/shared/ui/CartDrawer.tsx` (Optional)
Component drawer giỏ hàng đầy đủ màn hình (có thể dùng thay dropdown)

## Cách sử dụng

### Thêm sản phẩm vào giỏ
```typescript
import { useCartStore } from '@/store/cart.store'

function MyComponent() {
  const { addItem } = useCartStore()
  
  const handleAddToCart = () => {
    addItem({
      id: '1',
      name: 'Cà chua bi',
      image: '🍅',
      price: 25000,
      originalPrice: 30000,
      unit: 'kg',
      discount: '-17%'
    })
  }
  
  return <button onClick={handleAddToCart}>Thêm vào giỏ</button>
}
```

### Lấy thông tin giỏ hàng
```typescript
const { items, getTotalItems, getTotalPrice } = useCartStore()

console.log('Số sản phẩm:', getTotalItems())
console.log('Tổng tiền:', getTotalPrice())
```

### Cập nhật số lượng
```typescript
const { updateQuantity } = useCartStore()

updateQuantity('product-id', 5) // Set quantity to 5
```

### Xóa sản phẩm
```typescript
const { removeItem } = useCartStore()

removeItem('product-id')
```

## Test giỏ hàng

### Cách 1: Thêm sản phẩm từ trang chủ
1. Vào trang `/customer`
2. Scroll xuống phần "Rau củ tươi mỗi ngày"
3. Click nút "Thêm vào giỏ" trên bất kỳ sản phẩm nào
4. Xem số lượng ở header tăng lên
5. Click vào icon giỏ hàng ở header để preview
6. Click "Xem giỏ hàng" để vào trang giỏ hàng đầy đủ

### Cách 2: Thêm data mẫu (for testing)
```typescript
import { populateMockCart } from '@/data/mock-cart'

// Gọi hàm này trong useEffect hoặc button để thêm data mẫu
populateMockCart()
```

### Cách 3: Truy cập trực tiếp
1. Vào `/customer/cart`
2. Nếu giỏ trống, thêm sản phẩm từ trang chủ
3. Hoặc dùng mock data

## Routes

- `/customer` - Trang chủ (có ProductBlock để thêm sản phẩm)
- `/customer/cart` - Trang giỏ hàng đầy đủ
- `/customer/checkout` - Trang thanh toán (chưa implement)

## Tính năng đã hoàn thành

✅ Store quản lý giỏ hàng với Zustand
✅ Persist giỏ hàng vào localStorage
✅ Thêm/xóa/cập nhật sản phẩm
✅ Tính tổng tiền, tiết kiệm
✅ Preview giỏ hàng ở header
✅ Trang giỏ hàng đầy đủ với dark theme
✅ Checkbox chọn sản phẩm để thanh toán
✅ Điều chỉnh số lượng (+/-)
✅ Phần sản phẩm gợi ý
✅ Responsive design
✅ Animation và transitions

## Tính năng có thể mở rộng

- [ ] Tích hợp API backend cho giỏ hàng
- [ ] Đồng bộ giỏ hàng giữa các thiết bị
- [ ] Thêm voucher/coupon system
- [ ] Tính phí ship theo địa chỉ
- [ ] Lưu nhiều địa chỉ giao hàng
- [ ] Lịch sử đơn hàng
- [ ] Wishlist (danh sách yêu thích)

## Lưu ý

1. Giỏ hàng được lưu trong localStorage với key `cart-storage`
2. Data sẽ persist kể cả khi refresh trang
3. Mỗi sản phẩm cần có `id` unique
4. Giá tiền đang dùng VND (Vietnam Dong)
5. Emoji được dùng tạm cho ảnh sản phẩm (có thể thay bằng ảnh thật)

## Demo Screenshots

### Header Cart Preview
- Dropdown hiển thị nhanh sản phẩm trong giỏ
- Số lượng và tổng tiền
- Nút "Xem giỏ hàng"

### Cart Page (Dark Theme)
- Background màu đen (#1a1a1a)
- Card sản phẩm với ảnh, tên, giá
- Điều chỉnh số lượng
- Checkbox chọn sản phẩm
- Summary box sticky bên phải
- Sản phẩm gợi ý ở dưới
