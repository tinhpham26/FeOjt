# 🎨 Homepage Visual Reference - Bách Hóa Xanh Style

## Color Palette

### Primary Colors
```
🟢 Emerald 600 (#16a34a) - Primary brand color
🟢 Emerald 700 (#15803d) - Hover states, darker accents
🟢 Emerald 500 (#22c55e) - Lighter variant
🟢 Emerald 300 (#86efac) - Very light accents
🟢 Emerald 50 (#f0fdf4)  - Background tint
```

### Accent Colors
```
🔴 Red 500-600 - Flash Sale, Discounts
🟠 Orange 500 - Flash Sale gradient
🔵 Blue 50-700 - Delivery service
🟡 Yellow 400 - Star ratings
⚫ Gray 900 - Footer
```

---

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  🔝 STICKY HEADER                                            │
│  ┌──────┬──────────────────────┬─────────┬──────┬─────┐    │
│  │ Logo │   Search Bar         │Location │ User │Cart │    │
│  └──────┴──────────────────────┴─────────┴──────┴─────┘    │
├─────────────────────────────────────────────────────────────┤
│  📂 NAVIGATION BAR                                           │
│  [Danh mục ▼] [Khuyến mãi] [Siêu sale] [Hàng mới] [Bán chạy]│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      MAIN CONTENT                            │
│                                                              │
│  ┌──────────────────────────┬────────────────────┐          │
│  │                          │   🎁 Benefit 1     │          │
│  │    🖼️ HERO BANNER         │   💰 Benefit 2     │          │
│  │   (Auto-rotating)        │   ✅ Benefit 3     │          │
│  │                          │   🚚 Benefit 4     │          │
│  └──────────────────────────┴────────────────────┘          │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │  🛒 QUICK SHOPPING CATEGORIES (10 items)     │           │
│  │  [🥬][🍎][🍖][🐟][🥚][🍘][🧃][🍬][🧼][🧴]     │           │
│  └──────────────────────────────────────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │  ⚡ FLASH SALE (Countdown: 02:34:56)         │           │
│  │  [Product] [Product] [Product] [Product] >>> │           │
│  └──────────────────────────────────────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │  🔥 PRODUCT BLOCK 1                          │           │
│  │  [Tab1] [Tab2] [Tab3] [Tab4]                 │           │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐                │           │
│  │  │ P1 │ │ P2 │ │ P3 │ │ P4 │                │           │
│  │  └────┘ └────┘ └────┘ └────┘                │           │
│  └──────────────────────────────────────────────┘           │
│                                                              │
│  [Additional Product Blocks...]                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      📄 FOOTER                               │
│  [Company] [About] [Policy] [Support] [Contact]             │
│  Social Icons: [FB] [IG] [TW]                               │
│  © 2026 Bách Hóa Xanh                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Dimensions

### Header
- **Height**: 120px (60px top bar + 60px nav)
- **Logo size**: 40px × 40px
- **Search bar**: Max-width 800px
- **Icons**: 24px × 24px

### Hero Banner
- **Height**: 400px
- **Border radius**: 16px (rounded-2xl)
- **Content padding**: 24px

### Quick Categories
- **Grid**: 10 columns (responsive)
- **Item size**: 100px × 100px
- **Icon size**: 48px
- **Gap**: 16px

### Flash Sale
- **Product card**: 192px width
- **Image height**: 128px
- **Padding**: 24px
- **Gap**: 16px

### Product Block
- **Grid**: 4 columns
- **Card padding**: 16px
- **Image aspect**: 1:1 (square)
- **Border radius**: 12px

### Footer
- **Height**: Auto (min 300px)
- **Padding**: 48px
- **Columns**: 5

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Font Sizes
```
Hero Title:     text-5xl (48px) - font-bold
Section Title:  text-2xl (24px) - font-bold
Card Title:     text-xl (20px) - font-bold
Product Name:   text-sm (14px) - font-medium
Price:          text-lg (18px) - font-bold
Caption:        text-xs (12px) - font-normal
```

---

## Spacing System

### Padding
```
p-2:  8px    (tight)
p-4:  16px   (default)
p-6:  24px   (comfortable)
p-8:  32px   (spacious)
p-12: 48px   (very spacious)
```

### Gaps
```
gap-2:  8px   (tight grid)
gap-4:  16px  (default grid)
gap-6:  24px  (spacious grid)
```

### Margins
```
mb-4:  16px   (section spacing)
mb-6:  24px   (larger sections)
mt-12: 48px   (footer top)
mt-16: 64px   (major sections)
```

---

## Shadows & Effects

### Box Shadows
```css
shadow-sm:  0 1px 2px rgba(0,0,0,0.05)     /* Subtle */
shadow:     0 1px 3px rgba(0,0,0,0.1)      /* Default */
shadow-md:  0 4px 6px rgba(0,0,0,0.1)      /* Medium */
shadow-lg:  0 10px 15px rgba(0,0,0,0.1)    /* Large */
shadow-xl:  0 20px 25px rgba(0,0,0,0.1)    /* Extra large */
```

### Hover Effects
```css
hover:shadow-lg          /* Elevation on hover */
hover:-translate-y-1     /* Lift effect */
hover:scale-105          /* Zoom in */
hover:bg-emerald-700     /* Darken */
```

### Transitions
```css
transition-all           /* Smooth all properties */
transition-colors        /* Color changes only */
transition-shadow        /* Shadow changes */
transition-transform     /* Transform changes */
duration-300             /* 300ms (default) */
```

---

## Border Radius

```
rounded:      4px    (subtle)
rounded-lg:   8px    (default cards)
rounded-xl:   12px   (prominent cards)
rounded-2xl:  16px   (major sections)
rounded-full: 9999px (circles, pills)
```

---

## Icons & Emojis

### Navigation
```
🏠 Home
📂 Categories
🎁 Promotions
⚡ Flash Sale
🆕 New Arrivals
🔥 Best Sellers
```

### Categories
```
🥬 Vegetables
🍎 Fruits
🍖 Meat
🐟 Seafood
🥚 Dairy & Eggs
🍘 Dry Food
🧃 Beverages
🍬 Snacks
🧼 Household
🧴 Personal Care
```

### Services
```
🚚 Fast Delivery (2 hours)
💰 Best Price (Money back)
✅ Quality Guarantee
🎁 Member Benefits
```

### UI Actions
```
🔍 Search
📍 Location
👤 Account
🛒 Cart
❤️ Wishlist
⭐ Rating
➕ Add to Cart
```

---

## Responsive Breakpoints

### Mobile First Approach
```css
/* Mobile: Default styles */
.category-grid { grid-cols: 2 }

/* Tablet: sm (640px) */
@media (min-width: 640px) {
  .category-grid { grid-cols: 3 }
}

/* Desktop: md (768px) */
@media (min-width: 768px) {
  .category-grid { grid-cols: 5 }
}

/* Large Desktop: lg (1024px) */
@media (min-width: 1024px) {
  .category-grid { grid-cols: 10 }
}
```

---

## Animation Keyframes

### Float Effect
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}
```

### Pulse Effect (Flash Sale)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.7; }
}
```

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## Component States

### Button States
```
Default:  bg-emerald-600
Hover:    bg-emerald-700 + shadow-lg
Active:   bg-emerald-800 + scale-95
Disabled: opacity-50 + cursor-not-allowed
```

### Input States
```
Default:  border-gray-300
Focus:    ring-2 ring-emerald-500
Error:    border-red-500 ring-red-500
Success:  border-green-500 ring-green-500
```

### Card States
```
Default:  border-gray-100 shadow-sm
Hover:    border-emerald-300 shadow-lg
Active:   border-emerald-500 shadow-xl
```

---

## Loading States

### Skeleton Loaders
```tsx
<div className="animate-pulse">
  <div className="h-48 bg-gray-200 rounded-xl" />
  <div className="h-4 bg-gray-200 rounded mt-4" />
  <div className="h-4 bg-gray-200 rounded mt-2 w-3/4" />
</div>
```

### Spinners
```tsx
<div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent" />
```

---

## Accessibility (A11Y)

### Color Contrast
- Text on white: Gray-900 (#1f2937) - WCAG AAA
- White on emerald: Emerald-600 (#16a34a) - WCAG AA
- Links: Emerald-600, underline on hover

### Focus Indicators
```css
focus:outline-none
focus:ring-2
focus:ring-emerald-500
focus:ring-offset-2
```

### ARIA Labels
```tsx
<button aria-label="Add to cart">
<input aria-describedby="search-hint">
<nav aria-label="Main navigation">
```

---

## Performance Tips

### Image Optimization
- Use Next.js Image component
- Lazy load below fold
- Responsive srcSet
- WebP format with fallback

### Code Splitting
```tsx
const HeroBanner = dynamic(() => import('./HeroBanner'))
const FlashSale = dynamic(() => import('./FlashSaleStrip'))
```

### Caching Strategy
- Static assets: Cache-Control max-age
- API responses: SWR with revalidation
- User preferences: localStorage

---

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Safari iOS 14+
✅ Chrome Android 90+

---

**Design System Version: 1.0.0**
**Last Updated: January 28, 2026**
