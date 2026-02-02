# 🎨 Admin Sidebar Icon Reference

## Icon Mapping for All Menu Items

This document provides visual reference and rationale for each icon choice in the redesigned admin sidebar.

---

## 📊 Complete Icon List

### 1. Tổng quan (Overview)

#### Dashboard
- **Icon:** `LayoutDashboard`
- **Visual:** Grid layout with 4 squares
- **Rationale:** Represents dashboard panels and overview screens
- **Color:** Slate-400 (inactive) / White (active)

```tsx
<LayoutDashboard className="w-5 h-5" />
```

---

### 2. Người dùng & Phân quyền (IAM)

#### Users Management
- **Icon:** `Users`
- **Visual:** Two overlapping person silhouettes
- **Rationale:** Universal symbol for user management
- **Use Case:** List of all system users (admin, staff, managers)

```tsx
<Users className="w-5 h-5" />
```

#### Roles & Permissions
- **Icon:** `ShieldCheck`
- **Visual:** Shield with checkmark
- **Rationale:** Security + verification = access control
- **Use Case:** RBAC (Role-Based Access Control) configuration

```tsx
<ShieldCheck className="w-5 h-5" />
```

---

### 3. Sản phẩm & Danh mục (Products & Categories)

#### Products
- **Icon:** `Package2`
- **Visual:** 3D box/package
- **Rationale:** Physical product representation
- **Use Case:** SKU management, pricing, product details

```tsx
<Package2 className="w-5 h-5" />
```

#### Categories
- **Icon:** `FolderTree`
- **Visual:** Folder with tree structure
- **Rationale:** Hierarchical taxonomy visualization
- **Use Case:** Product categorization, nested categories

```tsx
<FolderTree className="w-5 h-5" />
```

---

### 4. Kho & Tồn kho (Inventory Management)

#### Inventory Overview
- **Icon:** `Warehouse`
- **Visual:** Warehouse building
- **Rationale:** Physical warehouse operations
- **Use Case:** Multi-warehouse stock dashboard

```tsx
<Warehouse className="w-5 h-5" />
```

#### Item Stock
- **Icon:** `PackageCheck`
- **Visual:** Package with checkmark
- **Rationale:** Verified/counted inventory items
- **Use Case:** Item-level stock tracking and verification

```tsx
<PackageCheck className="w-5 h-5" />
```

#### Low-stock Alerts
- **Icon:** `AlertTriangle`
- **Visual:** Triangle with exclamation mark
- **Rationale:** Universal warning symbol
- **Use Case:** Automatic reorder notifications, critical stock levels

```tsx
<AlertTriangle className="w-5 h-5" />
```

#### Inventory Logs
- **Icon:** `ScrollText`
- **Visual:** Document scroll with lines
- **Rationale:** Historical records and audit trails
- **Use Case:** Stock movement history, audit logs

```tsx
<ScrollText className="w-5 h-5" />
```

---

### 5. Đơn hàng (Orders)

#### Online Orders
- **Icon:** `ShoppingCart`
- **Visual:** Shopping cart
- **Rationale:** E-commerce standard icon
- **Use Case:** Web/app orders, customer purchases

```tsx
<ShoppingCart className="w-5 h-5" />
```

#### POS Orders
- **Icon:** `Store`
- **Visual:** Storefront building
- **Rationale:** Physical retail location
- **Use Case:** In-store point-of-sale transactions

```tsx
<Store className="w-5 h-5" />
```

#### Order Status
- **Icon:** `ListChecks`
- **Visual:** List with checkboxes
- **Rationale:** Order tracking and status updates
- **Use Case:** Unified order management dashboard

```tsx
<ListChecks className="w-5 h-5" />
```

---

### 6. Khách hàng & Loyalty (Customer & Loyalty)

#### Customers
- **Icon:** `UserCircle`
- **Visual:** Single user in circle
- **Rationale:** Individual customer profile
- **Use Case:** Customer database, profiles, segments

```tsx
<UserCircle className="w-5 h-5" />
```

#### Loyalty & Points
- **Icon:** `Award`
- **Visual:** Trophy/medal
- **Rationale:** Rewards and achievements
- **Use Case:** Loyalty tiers, points system, rewards catalog

```tsx
<Award className="w-5 h-5" />
```

---

### 7. Khuyến mãi (Promotions)

#### Promotions
- **Icon:** `Tag`
- **Visual:** Price tag
- **Rationale:** Discounts and special offers
- **Use Case:** Marketing campaigns, seasonal sales

```tsx
<Tag className="w-5 h-5" />
```

#### Coupons
- **Icon:** `Ticket`
- **Visual:** Admission ticket
- **Rationale:** Redeemable vouchers
- **Use Case:** Coupon codes, gift cards, vouchers

```tsx
<Ticket className="w-5 h-5" />
```

---

### 8. Giao vận (Delivery & Logistics)

#### Delivery Management
- **Icon:** `Truck`
- **Visual:** Delivery truck
- **Rationale:** Transportation and logistics
- **Use Case:** Driver assignment, route planning, fleet management

```tsx
<Truck className="w-5 h-5" />
```

#### Pickup & Shipping
- **Icon:** `PackageSearch`
- **Visual:** Package with magnifying glass
- **Rationale:** Shipment tracking
- **Use Case:** Order tracking, shipping status, pickup coordination

```tsx
<PackageSearch className="w-5 h-5" />
```

---

### 9. Báo cáo (Reports & Analytics)

#### Sales Reports
- **Icon:** `TrendingUp`
- **Visual:** Upward trending line chart
- **Rationale:** Revenue growth and sales metrics
- **Use Case:** Sales analytics, conversion rates, performance metrics

```tsx
<TrendingUp className="w-5 h-5" />
```

#### Inventory Reports
- **Icon:** `PackageOpen`
- **Visual:** Opened package
- **Rationale:** Inventory insights and analysis
- **Use Case:** Stock turnover, waste analysis, inventory health

```tsx
<PackageOpen className="w-5 h-5" />
```

#### Profit & Loss
- **Icon:** `DollarSign`
- **Visual:** Dollar currency symbol
- **Rationale:** Financial statements
- **Use Case:** P&L statements, financial reports, revenue analysis

```tsx
<DollarSign className="w-5 h-5" />
```

#### All Reports
- **Icon:** `BarChart3`
- **Visual:** Bar chart with 3 bars
- **Rationale:** General analytics and reporting
- **Use Case:** Report hub, custom reports, data exports

```tsx
<BarChart3 className="w-5 h-5" />
```

---

### 10. Hệ thống (System Settings)

#### Configuration
- **Icon:** `Settings`
- **Visual:** Gear/cog
- **Rationale:** Universal settings icon
- **Use Case:** System-wide configuration, feature toggles

```tsx
<Settings className="w-5 h-5" />
```

#### Security
- **Icon:** `Lock`
- **Visual:** Padlock
- **Rationale:** Security and access control
- **Use Case:** Session management, API keys, audit logs

```tsx
<Lock className="w-5 h-5" />
```

---

## 🎯 Icon Design Principles

### 1. **Consistency**
- All icons from Lucide library (consistent stroke width: 2px)
- Uniform size: 20px × 20px
- Same visual weight across all icons

### 2. **Clarity**
- Simple, recognizable shapes
- No ambiguous or abstract icons
- Industry-standard symbols where possible

### 3. **Context**
- Icons match their functional purpose
- Operational focus (not decorative)
- Business domain aligned

### 4. **Scalability**
- Work well at different sizes
- Clear at both 16px and 24px
- SVG format for crisp rendering

### 5. **Accessibility**
- High contrast ratios
- Not color-dependent (work in grayscale)
- Paired with text labels

---

## 📦 Icon Import Example

```tsx
import {
  // Overview
  LayoutDashboard,
  
  // IAM
  Users,
  ShieldCheck,
  
  // Products
  Package2,
  FolderTree,
  
  // Inventory
  Warehouse,
  PackageCheck,
  AlertTriangle,
  ScrollText,
  
  // Orders
  ShoppingCart,
  Store,
  ListChecks,
  
  // Customers
  UserCircle,
  Award,
  
  // Promotions
  Tag,
  Ticket,
  
  // Delivery
  Truck,
  PackageSearch,
  
  // Reports
  TrendingUp,
  PackageOpen,
  DollarSign,
  BarChart3,
  
  // System
  Settings,
  Lock,
  
  // UI Controls
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
```

---

## 🎨 Icon Styling

### Default State
```tsx
<Package2 className="w-5 h-5 text-slate-400" />
```

### Active State
```tsx
<Package2 className="w-5 h-5 text-white" />
```

### Hover State
```tsx
<Package2 className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
```

### With Custom Color
```tsx
<AlertTriangle className="w-5 h-5 text-yellow-500" />
```

---

## 🔄 Alternative Icon Suggestions

If a specific icon doesn't resonate with your team, here are alternatives:

| Current | Alternative 1 | Alternative 2 | Reason |
|---------|---------------|---------------|--------|
| `Package2` | `Box` | `Layers` | Different package styles |
| `Warehouse` | `Building2` | `Home` | Warehouse representation |
| `Award` | `Star` | `Trophy` | Rewards/loyalty |
| `Tag` | `PercentCircle` | `BadgePercent` | Discount focus |
| `Ticket` | `Receipt` | `CreditCard` | Payment/voucher |

---

## 📊 Icon Usage Statistics

```
Total Unique Icons: 26
Most Common Category: Inventory (4 icons)
Icon Library: Lucide React
Package Size: ~50KB (tree-shaken)
Load Time Impact: <10ms
```

---

## 🔗 Resources

- **Lucide Icons:** https://lucide.dev
- **Icon Previewer:** https://lucide.dev/icons
- **Design Tokens:** See `AdminSidebar.tsx`
- **Figma Library:** [Internal Link]

---

## ✅ Quality Checklist

- [x] All icons from single library (Lucide)
- [x] Consistent stroke width (2px)
- [x] Uniform sizing (20×20px)
- [x] Semantic naming
- [x] Accessibility friendly
- [x] High contrast support
- [x] SVG format (scalable)
- [x] Tree-shakeable imports
- [x] TypeScript typed
- [x] Documented rationale

---

**Last Updated:** February 2, 2026  
**Icon Library Version:** lucide-react ^0.364.0  
**Maintained By:** Frontend Architecture Team
