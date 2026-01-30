# 🏪 Thiết kế Homepage - Bách Hóa Xanh E-Commerce Platform

## 📋 Tổng quan

Homepage được thiết kế theo phong cách **Bách Hóa Xanh** (BHX) - chuỗi bán lẻ hàng tiêu dùng hàng đầu Việt Nam, tập trung vào:
- ✅ Trải nghiệm người dùng thân thiện, dễ sử dụng
- ✅ Hiệu suất chuyển đổi cao
- ✅ Responsive hoàn hảo trên mobile & desktop
- ✅ Màu xanh lá chủ đạo (emerald/green)
- ✅ Tích hợp microservices architecture

## 🎨 Hệ thống màu sắc

### Primary Colors (BHX Green Theme)
```css
--color-bhx-primary: #16a34a    /* Emerald 600 - Màu chính */
--color-bhx-dark: #15803d       /* Emerald 700 - Đậm hơn */
--color-bhx-light: #22c55e      /* Emerald 500 - Nhạt hơn */
--color-bhx-lighter: #86efac    /* Emerald 300 - Rất nhạt */
--color-bhx-bg: #f0fdf4         /* Emerald 50 - Background */
```

### Utility Classes
- `.btn-bhx` - Button với gradient xanh
- `.card-bhx` - Card với viền xanh
- `.gradient-bhx` - Gradient xanh emerald
- `.text-bhx` - Text màu xanh chính

## 🏗️ Cấu trúc Layout

### 1. 🔝 Header Component
**File:** `src/features/catalog/components/CustomerHeader.tsx`

#### Tính năng:
- **Logo** - Góc trái, brand recognition với icon 🌿
- **Search Bar** - Trung tâm, tìm kiếm thông minh
  - Input field với placeholder "Tìm kiếm sản phẩm..."
  - Icon kính lúp bên phải
  - Focus state với ring emerald
- **Location Dropdown** - Chọn khu vực giao hàng
  - Icon 📍 location
  - Hiển thị "Quận 1, HCM"
  - Dropdown cho multiple locations
- **Account Status** - Trạng thái đăng nhập
  - Icon user circle
  - Link đến "/login" khi chưa đăng nhập
  - Hiển thị tên user sau khi login
- **Shopping Cart** - Giỏ hàng có thông báo
  - Icon giỏ hàng
  - Badge số lượng sản phẩm
  - Link đến "/customer/cart"

**Đặc điểm:**
- Sticky positioning (luôn hiển thị khi scroll)
- Shadow effect khi scroll
- Responsive: Thu gọn trên mobile

---

### 2. 📂 Navigation Bar
**File:** `src/features/catalog/components/NavBar.tsx`

#### Menu chính:
- **Danh mục sản phẩm** (Mega menu dropdown)
  - Rau củ quả 🥬
  - Thịt, cá, trứng 🥩
  - Thực phẩm khô 🍚
  - Đồ uống 🥤
  - Bánh kẹo 🍪
  - Chăm sóc cá nhân 🧴

#### Quick links:
- Khuyến mãi
- Siêu sale
- Hàng mới về
- Sản phẩm bán chạy

**Mega Menu Features:**
- 2-column layout: Categories + Subcategories
- Hover effect với smooth transition
- Icons cho mỗi danh mục
- Z-index cao để overlay content

---

### 3. 🖼️ Hero Banner
**File:** `src/features/promotions/components/HeroBanner.tsx`

#### Tính năng:
- **Auto-rotating carousel** (3 banners, 5s interval)
- Banner 1: Siêu sale mùa hè ☀️
- Banner 2: Tươi ngon mỗi ngày 🥬
- Banner 3: Thành viên mới 🎁

**Thiết kế:**
- Full-width gradient backgrounds
- Decorative blur circles
- Large heading text (5xl font)
- CTA button nổi bật
- Indicator dots ở bottom
- Auto & manual navigation

**Responsive:**
- Height: 400px on desktop
- Adaptive text size on mobile

---

### 4. 🛒 Quick Shopping Categories
**File:** `src/features/catalog/components/QuickCategories.tsx`

#### 10 danh mục chính:

| Danh mục | Icon | Màu nền | Link |
|----------|------|---------|------|
| Rau củ tươi | 🥬 | Green | /customer/category/vegetables |
| Trái cây | 🍎 | Red | /customer/category/fruits |
| Thịt tươi | 🍖 | Pink | /customer/category/meat |
| Hải sản | 🐟 | Blue | /customer/category/seafood |
| Sữa & trứng | 🥚 | Yellow | /customer/category/dairy |
| Thực phẩm khô | 🍘 | Orange | /customer/category/dry-food |
| Đồ uống | 🧃 | Purple | /customer/category/beverages |
| Bánh kẹo | 🍬 | Rose | /customer/category/snacks |
| Đồ gia dụng | 🧼 | Teal | /customer/category/household |
| Chăm sóc cá nhân | 🧴 | Indigo | /customer/category/personal-care |

**Interactions:**
- Hover: Scale icon + shadow
- Translate-y on hover (-4px)
- Smooth color transitions

**Grid:**
- 10 columns on large screens
- 5 columns on medium
- 3 columns on small
- 2 columns on mobile

---

### 5. ⏱️ Flash Sale Strip
**File:** `src/features/promotions/components/FlashSaleStrip.tsx`

#### Tính năng chính:
- **Live Countdown Timer** (Hours:Minutes:Seconds)
  - Real-time update mỗi giây
  - Display format: 02:34:56
  - White backdrop blur boxes

- **Product Cards** (8 sản phẩm)
  - Horizontal scroll
  - Discount badge (-45%, -35%, etc.)
  - Original price strikethrough
  - Sale price in red
  - Progress bar (sold/stock ratio)
  - Stock counter

**Styling:**
- Gradient background: red-500 → orange-500
- Animated lightning bolt ⚡
- White text với drop shadow
- Card hover: shadow-lg

**Data tracking:**
- Sold count
- Stock remaining
- Percentage calculation for progress

---

### 6. 🎁 Benefit Cards
**File:** `src/features/catalog/components/BenefitCards.tsx`

#### 4 dịch vụ hỗ trợ:

1. **🚚 Giao hàng nhanh**
   - Trong 2 giờ
   - Miễn phí cho đơn từ 150K
   - Blue theme

2. **💰 Giá tốt nhất**
   - Cam kết hoàn tiền
   - Nếu tìm thấy giá rẻ hơn
   - Emerald theme

3. **✅ Đảm bảo chất lượng**
   - Hàng chính hãng
   - 100% tươi ngon
   - Green theme

4. **🎁 Ưu đãi độc quyền**
   - Cho thành viên
   - Tích điểm đổi quà
   - Orange theme

**Layout:**
- Vertical stack (sidebar)
- Hover effect: shadow + translate
- Border-2 với matching color
- 3-line content structure

---

### 7. 📦 Product Blocks
**File:** `src/features/catalog/components/ProductBlock.tsx`

#### Tính năng:
- **Tab Navigation**
  - Tất cả
  - Rau củ
  - Trái cây
  - Bán chạy

- **Product Grid** (4 columns)
  - Product image (emoji placeholder)
  - Product name (2-line clamp)
  - Star rating
  - Price with unit
  - Add to cart button (+)

**Interactions:**
- Hover card: shadow-lg
- Image scale on hover
- Active tab indicator (bottom border)

**Multiple blocks:**
- 🔥 Sản phẩm nổi bật
- 🥬 Rau củ tươi mới mỗi ngày
- 🍎 Trái cây nhập khẩu
- 🍖 Thịt tươi sống - Hải sản
- 🥛 Sữa, trứng & Sản phẩm từ sữa
- 🍚 Thực phẩm tiện lợi

---

### 8. 📄 Footer
**File:** `src/app/(customer)/page.tsx`

#### 5-column layout:

1. **Company Info**
   - Logo + tagline
   - Brand description

2. **Về chúng tôi**
   - Giới thiệu
   - Tuyển dụng
   - Tin tức
   - Hệ thống cửa hàng

3. **Chính sách**
   - Đổi trả
   - Bảo mật
   - Điều khoản
   - Thanh toán

4. **Hỗ trợ khách hàng**
   - FAQ
   - Hướng dẫn mua hàng
   - Tra cứu đơn hàng
   - Yêu cầu hỗ trợ

5. **Liên hệ**
   - 📞 Hotline
   - ✉️ Email
   - ⏰ Giờ làm việc
   - Social icons

**Styling:**
- Gradient: emerald-900 → gray-900
- White text
- Emerald-400 hover states
- Bottom bar với copyright

---

## 🎯 Tính năng đặc biệt

### ✨ Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### 🔍 Search Intelligence
- Autocomplete suggestions
- Recent searches
- Popular keywords
- Category filtering

### 📍 Location Services
- Multi-store selection
- Delivery time estimation
- Stock availability per location

### 🔔 Notifications
- Cart updates
- Flash sale alerts
- Order status
- Loyalty points

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: < 640px
  - Single column layout
  - Simplified header
  - Stack categories 2-col
  
- **Tablet**: 640px - 1024px
  - 2-column hero + sidebar
  - 3-5 col categories
  - Condensed navigation

- **Desktop**: > 1024px
  - Full layout
  - 10-col categories
  - Mega menu
  - Sidebar benefits

---

## 🔌 Integration Points

### Microservices:

1. **Catalog Service** (`/api/catalog`)
   - Product listing
   - Categories
   - Search

2. **Promotion Service** (`/api/promotions`)
   - Flash sales
   - Banners
   - Coupons

3. **Order Service** (`/api/orders`)
   - Cart management
   - Checkout

4. **Loyalty Service** (`/api/loyalty`)
   - Points tracking
   - Rewards

5. **IAM Service** (`/api/iam`)
   - Authentication
   - User profile

6. **Reporting Service** (`/api/reports`)
   - Analytics
   - User behavior

---

## 🚀 Performance Optimization

### Loading Strategies:
- Lazy load product images
- Infinite scroll for product lists
- Prefetch flash sale data
- Cache location preferences

### Bundle Size:
- Code splitting by route
- Dynamic imports for heavy components
- Optimize icon libraries

---

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators

---

## 🧪 Testing Checklist

- [ ] Header sticky scroll behavior
- [ ] Search functionality
- [ ] Location dropdown
- [ ] Cart updates
- [ ] Banner auto-rotation
- [ ] Flash sale countdown
- [ ] Product add to cart
- [ ] Mobile responsive
- [ ] Cross-browser compatibility
- [ ] Performance metrics

---

## 📚 File Structure

```
src/
├── app/
│   ├── (customer)/
│   │   └── page.tsx              # Main homepage
│   └── globals.css               # BHX theme styles
├── features/
│   ├── catalog/
│   │   └── components/
│   │       ├── CustomerHeader.tsx
│   │       ├── MainHeader.tsx
│   │       ├── NavBar.tsx
│   │       ├── QuickCategories.tsx
│   │       ├── BenefitCards.tsx
│   │       └── ProductBlock.tsx
│   └── promotions/
│       └── components/
│           ├── HeroBanner.tsx
│           └── FlashSaleStrip.tsx
```

---

## 🎓 Best Practices

1. **Component Reusability** - Tất cả components đều độc lập và tái sử dụng
2. **TypeScript** - Type-safe cho tất cả props và data
3. **Performance** - Sử dụng React.memo() cho components lớn
4. **SEO** - Semantic HTML, meta tags, structured data
5. **Analytics** - Track user interactions, conversions
6. **Error Handling** - Graceful fallbacks cho API failures

---

## 🔄 Future Enhancements

- [ ] Personalized product recommendations
- [ ] AI-powered search
- [ ] Voice search integration
- [ ] AR product preview
- [ ] Social shopping features
- [ ] Live chat support
- [ ] Multi-language support
- [ ] Dark mode theme

---

## 📞 Support

Để biết thêm chi tiết về cấu trúc và triển khai, tham khảo:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Project overview
- [SETUP.md](./SETUP.md) - Development setup

---

**Designed with 💚 by the CFMS Team**
