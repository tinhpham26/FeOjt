# 🚀 Quick Start Guide - Homepage Development

## ⚡ Chạy project

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở browser
# http://localhost:3000/customer
```

---

## 📁 Files quan trọng

### Components chính
```
src/features/catalog/components/
├── CustomerHeader.tsx      # Header với search, cart, location
├── MainHeader.tsx          # Top bar của header
├── NavBar.tsx              # Navigation menu
├── QuickCategories.tsx     # 10 danh mục mua sắm nhanh
├── BenefitCards.tsx        # 4 lợi ích dịch vụ
└── ProductBlock.tsx        # Block sản phẩm với tabs

src/features/promotions/components/
├── HeroBanner.tsx          # Banner chính có carousel
└── FlashSaleStrip.tsx      # Flash sale với countdown
```

### Page
```
src/app/(customer)/page.tsx # Homepage layout
```

### Styles
```
src/app/globals.css         # BHX theme styles
```

---

## 🎨 Sử dụng BHX Theme

### Colors
```tsx
// Primary colors
className="bg-emerald-600 text-white"
className="text-emerald-600"
className="border-emerald-600"

// Gradient
className="bg-gradient-to-r from-emerald-400 to-cyan-400"
```

### Custom classes
```tsx
// Buttons
<button className="btn-bhx">Mua ngay</button>
<button className="btn-primary">Submit</button>

// Cards
<div className="card-bhx">...</div>
<div className="card">...</div>

// Utilities
<div className="gradient-bhx">...</div>
<h1 className="text-bhx">Title</h1>
```

---

## 🔧 Customization

### Thay đổi màu chủ đạo

**File:** `src/app/globals.css`

```css
:root {
  --color-bhx-primary: #16a34a;    /* Thay đổi màu này */
  --color-bhx-dark: #15803d;
  --color-bhx-light: #22c55e;
}
```

### Thêm danh mục mới

**File:** `src/features/catalog/components/QuickCategories.tsx`

```tsx
const categories = [
  {
    id: 11,
    name: 'Danh mục mới',
    icon: '🎯',
    color: 'bg-purple-50 hover:bg-purple-100',
    textColor: 'text-purple-700',
    href: '/customer/category/new-category'
  },
  // ... existing categories
]
```

### Thêm banner mới

**File:** `src/features/promotions/components/HeroBanner.tsx`

```tsx
const banners = [
  {
    id: 4,
    title: 'BANNER MỚI',
    subtitle: 'Mô tả banner',
    cta: 'Action text',
    href: '/link',
    gradient: 'from-blue-400 to-purple-500',
    icon: '🎉'
  },
  // ... existing banners
]
```

### Cấu hình Flash Sale

**File:** `src/features/promotions/components/FlashSaleStrip.tsx`

```tsx
// Thời gian countdown (hours, minutes, seconds)
const [timeLeft, setTimeLeft] = useState({ 
  hours: 3,      // Thay đổi số giờ
  minutes: 0, 
  seconds: 0 
})

// Thêm sản phẩm
const flashSaleProducts = [
  {
    id: 9,
    name: 'Tên sản phẩm',
    price: '99.000đ',
    originalPrice: '149.000đ',
    discount: '-33%',
    image: '🎁',
    sold: 100,
    stock: 500
  },
  // ...
]
```

---

## 🎯 Component API

### QuickCategories
```tsx
<QuickCategories />
// Props: None
// Displays: 10 shopping categories in responsive grid
```

### HeroBanner
```tsx
<HeroBanner />
// Props: None
// Features: Auto-rotating carousel (5s interval), 3 banners
```

### FlashSaleStrip
```tsx
<FlashSaleStrip />
// Props: None
// Features: Live countdown, horizontal scroll, 8 products
```

### BenefitCards
```tsx
<BenefitCards />
// Props: None
// Displays: 4 service benefits vertically stacked
```

### ProductBlock
```tsx
<ProductBlock title="🔥 Sản phẩm nổi bật" />
// Props:
//   - title: string (required)
// Features: Tabs, 4-column grid, add to cart
```

---

## 📱 Responsive Testing

### Breakpoints để test
```
Mobile:    375px  (iPhone SE)
           390px  (iPhone 12/13)
           414px  (iPhone Pro Max)

Tablet:    768px  (iPad)
           820px  (iPad Air)
           1024px (iPad Pro)

Desktop:   1280px (HD)
           1440px (Full HD)
           1920px (Full HD+)
```

### Test trong Chrome DevTools
```
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Select device hoặc nhập custom width
3. Test các breakpoints
```

---

## 🔍 Debugging

### Common issues

**Problem:** Components không hiển thị
```bash
# Check console for errors
# Verify import paths
# Ensure all dependencies installed
npm install
```

**Problem:** Styles không apply
```bash
# Restart dev server
npm run dev

# Clear .next cache
rm -rf .next
npm run dev
```

**Problem:** Flash sale countdown không chạy
```tsx
// Check useEffect dependencies
useEffect(() => {
  const timer = setInterval(() => {
    // Timer logic
  }, 1000)
  return () => clearInterval(timer) // Important!
}, [])
```

---

## 🧪 Testing Components

### Manual testing checklist

#### Header
- [ ] Logo links to homepage
- [ ] Search input accepts text
- [ ] Location dropdown opens
- [ ] Cart shows item count
- [ ] Sticky on scroll works

#### Hero Banner
- [ ] Auto-rotates every 5 seconds
- [ ] Manual dots navigation works
- [ ] CTA buttons link correctly
- [ ] Responsive on mobile

#### Quick Categories
- [ ] All 10 categories display
- [ ] Hover effects work
- [ ] Links navigate correctly
- [ ] Responsive grid adjusts

#### Flash Sale
- [ ] Countdown updates every second
- [ ] Progress bars show correct %
- [ ] Horizontal scroll works
- [ ] "Xem tất cả" link works

#### Product Blocks
- [ ] Tabs switch correctly
- [ ] Products display in grid
- [ ] Add to cart button works
- [ ] Hover effects apply

---

## 📊 Performance Optimization

### Image Optimization
```tsx
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="Product"
  width={300}
  height={300}
  loading="lazy"
/>
```

### Lazy Loading
```tsx
// Dynamic import for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
})
```

### Memoization
```tsx
// Prevent unnecessary re-renders
import { memo } from 'react'

export const ProductCard = memo(({ product }) => {
  // Component logic
})
```

---

## 🔐 Environment Variables

**File:** `.env.local`

```env
# API endpoints
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_CATALOG_API=/catalog
NEXT_PUBLIC_PROMOTION_API=/promotions

# Feature flags
NEXT_PUBLIC_ENABLE_FLASH_SALE=true
NEXT_PUBLIC_ENABLE_LOYALTY=true

# Analytics
NEXT_PUBLIC_GA_ID=GA-XXXXXXX
```

---

## 📦 Build & Deploy

### Production build
```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Check bundle size
npm run build -- --analyze
```

### Optimization tips
- Enable compression (gzip/brotli)
- Use CDN for static assets
- Enable ISR (Incremental Static Regeneration)
- Implement proper caching headers

---

## 🆘 Getting Help

### Resources
- 📖 [HOMEPAGE_DESIGN.md](./HOMEPAGE_DESIGN.md) - Full design documentation
- 🎨 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Visual reference guide
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- 📝 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Project overview

### Team contacts
- Frontend Lead: [Contact info]
- UX Designer: [Contact info]
- Backend API: [Contact info]

---

## ✅ Pre-launch Checklist

- [ ] All components render correctly
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Cross-browser tested
- [ ] Lighthouse score > 90
- [ ] SEO meta tags added
- [ ] Analytics integrated
- [ ] Error boundaries implemented
- [ ] Loading states added
- [ ] Accessibility checked (WCAG AA)

---

## 🎓 Next Steps

1. **Integrate real data** from backend APIs
2. **Add authentication** flow
3. **Implement shopping cart** functionality
4. **Setup payment** gateway
5. **Add order tracking**
6. **Implement loyalty** program
7. **Setup analytics** tracking
8. **Add unit tests**
9. **Performance monitoring**
10. **User feedback** collection

---

**Happy Coding! 💚🚀**

For detailed information, refer to the full documentation files.
