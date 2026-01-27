# Technical Architecture & Design

## 🏗️ Architecture Overview

This is an enterprise-grade Next.js 14 frontend for a retail chain management system with microservices architecture.

### Architecture Pattern

```
┌─────────────────────────────────────┐
│   Next.js App Router Frontend       │
├─────────────────────────────────────┤
│  Route Groups: (auth), (admin),     │
│  (ops), (customer)                  │
├─────────────────────────────────────┤
│  Shared Infrastructure Layer        │
│  - API Client (Axios)               │
│  - RBAC System                      │
│  - UI Components                    │
│  - State Management (Zustand)       │
├─────────────────────────────────────┤
│  Feature Modules                    │
│  - IAM, Orders, Inventory,          │
│  - Catalog, Promotions, Loyalty,    │
│  - Reporting, Shifts, Delivery,     │
│  - Customers                        │
├─────────────────────────────────────┤
│  Middleware (Auth, Role Checks)     │
├─────────────────────────────────────┤
│  API Gateway / Microservices        │
└─────────────────────────────────────┘
```

## 🔐 RBAC System Design

### Role Hierarchy

```
ADMIN (All Permissions)
  ├── STORE_MANAGER (Store Operations)
  ├── WAREHOUSE_MANAGER (Inventory)
  ├── STAFF (Variable Permissions)
  └── CUSTOMER (Self-Service)
```

### Permission Matrix

| Permission | ADMIN | STORE_MGR | WAREHOUSE_MGR | STAFF | CUSTOMER |
|-----------|-------|-----------|----------------|-------|----------|
| IAM_READ | ✓ | | | | |
| IAM_WRITE | ✓ | | | | |
| PRODUCT_READ | ✓ | | | | |
| PRODUCT_WRITE | ✓ | | | | |
| INVENTORY_READ | ✓ | ✓ | ✓ | | |
| INVENTORY_WRITE | ✓ | | ✓ | | |
| ORDER_ONLINE_READ | ✓ | ✓ | ✓ | | |
| ORDER_ONLINE_WRITE | ✓ | ✓ | | | |
| ORDER_POS_READ | ✓ | ✓ | | | |
| ORDER_POS_WRITE | ✓ | ✓ | | | |
| SHIFT_READ | ✓ | ✓ | | | |
| SHIFT_WRITE | ✓ | ✓ | | | |
| DELIVERY_READ | ✓ | | | | |
| DELIVERY_WRITE | ✓ | | | | |
| PROMO_READ | ✓ | | | | |
| PROMO_WRITE | ✓ | | | | |
| LOYALTY_READ | ✓ | | | | |
| LOYALTY_WRITE | ✓ | | | | |
| REPORT_READ | ✓ | ✓ | ✓ | | |
| CUSTOMER_READ | ✓ | ✓ | | | |
| CUSTOMER_WRITE | ✓ | ✓ | | | |

### Protection Levels

#### Route Guard (Middleware)
```typescript
// middleware.ts - Protects entire routes
GET /admin → ADMIN only
GET /ops → STAFF, STORE_MANAGER, WAREHOUSE_MANAGER
GET /customer → CUSTOMER
```

#### UI Guard (Component)
```typescript
<PermissionGuard permission="INVENTORY_WRITE">
  <Button>Adjust Stock</Button>
</PermissionGuard>
```

## 📡 API Layer Design

### HTTP Client Strategy

```typescript
// src/shared/api/http.ts

// Request Interceptor
├── Attach Authorization Bearer token
├── Add Content-Type headers
└── Add request metadata

// Response Interceptor
├── Handle 401 (Unauthorized) → Redirect to login
├── Handle 403 (Forbidden) → Show 403 page
├── Handle 4xx/5xx → Normalize error
└── Return data or error
```

### Endpoint Configuration

```typescript
// src/shared/api/endpoints.ts

// Supports two modes:
1. API Gateway Mode
   └── All requests to NEXT_PUBLIC_API_BASE_URL

2. Per-Service Mode
   ├── IAM → NEXT_PUBLIC_IAM_URL
   ├── Orders → NEXT_PUBLIC_ORDER_URL
   ├── Inventory → NEXT_PUBLIC_INVENTORY_URL
   └── ... (10 services total)
```

### Error Normalization

```typescript
// API errors standardized to:
{
  status: number
  message: string
  code: string
  details?: object
}
```

## 🎯 State Management

### Zustand Stores

#### Auth Store
```typescript
useAuthStore()
├── State: user, token, isAuthenticated, isLoading
├── Actions: login(), logout(), setUser(), setToken()
└── Selectors: hasPermission(), hasRole()
```

#### UI Store
```typescript
useUIStore()
├── State: sidebarOpen, theme, notifications, loading
├── Actions: toggleSidebar(), setTheme(), addNotification()
└── Selectors: All state accessible directly
```

### Persistence

- Auth state persisted to localStorage (tokens)
- UI state persisted to browser localStorage
- Automatic hydration on app load

## 🎨 Component Architecture

### Component Hierarchy

```
Layout (RootLayout)
├── LayoutGroup (auth/admin/ops/customer)
│   ├── Shell (authentication/sidebar/header)
│   ├── RouteGuard (verify role)
│   └── Page Content
│       ├── PageHeader
│       ├── FilterBar (optional)
│       ├── DataTable | Grid
│       └── Modal/Drawer (optional)
```

### UI Component Library

All components use:
- TailwindCSS for styling
- TypeScript for type safety
- forwardRef for ref passing
- Accessibility best practices

```typescript
// Example: Button component
<Button 
  variant="primary"    // primary | secondary | danger | outline
  size="md"           // sm | md | lg
  loading={false}     // Show spinner
  disabled={false}    // Disable state
  fullWidth={false}   // 100% width
>
  Click me
</Button>
```

## 🔄 Data Flow

### Authentication Flow

```
1. User visits /auth/login
   ↓
2. Submits form with email/password
   ↓
3. Axios POST to /auth/login
   ↓
4. Backend validates and returns JWT + user
   ↓
5. Store in auth.store (Zustand)
   ↓
6. Save token to localStorage
   ↓
7. Set cookies for middleware
   ↓
8. Redirect to dashboard (/admin, /ops, /customer)
```

### Protected Route Flow

```
1. User navigates to /admin
   ↓
2. Middleware checks auth_token cookie
   ↓
3. Middleware checks user_role cookie
   ↓
4. Compares with allowed roles
   ↓
5. If unauthorized → Redirect to /auth/login
   ↓
6. If authorized → Continue to page
   ↓
7. RouteGuard component re-verifies
```

### Permission Check Flow

```
1. Component renders with <PermissionGuard>
   ↓
2. Component accesses useAuthStore().user
   ↓
3. Checks if user.permissions includes required permission
   ↓
4. If yes → Render children
   ↓
5. If no → Render fallback or null
```

## 🚀 Performance Optimizations

### Code Splitting
- Route groups create automatic code splitting
- Lazy load feature modules on demand
- Dynamic imports for modals/drawers

### Server Components (by default)
- Layout.tsx → Server Component
- page.tsx files → Server Component
- Use 'use client' only where needed

### Caching Strategy
- Static pages: Build time
- API responses: TanStack Query (ready to implement)
- Images: Next.js Image optimization

### Bundle Size
- ~45KB gzipped (without node_modules)
- TailwindCSS minified (~3KB)
- Framework: ~35KB (Next.js runtime)

## 📦 Build Configuration

### Next.js Config
```javascript
// next.config.js
{
  reactStrictMode: true,    // Strict development mode
  swcMinify: true,          // Fast minification
  removeConsole: production // Remove console.log in prod
}
```

### TypeScript Config
```json
{
  "strict": true,           // Strict type checking
  "isolatedModules": true,  // Faster builds
  "noImplicitAny": true     // No implicit any
}
```

### Tailwind Config
```javascript
{
  content: [src/**/*.{ts,tsx}],  // Purge unused styles
  theme: {
    extend: {
      colors: { ... }       // Custom theme colors
    }
  }
}
```

## 🔗 API Integration Points

### Endpoints to Implement

Each feature module needs to integrate with:

| Module | Endpoints | Methods |
|--------|-----------|---------|
| Auth | /auth/login, /auth/logout, /auth/refresh | POST, POST, POST |
| Users | /users, /users/:id, /users/:id/permissions | GET, PATCH, GET |
| Orders | /orders, /orders/:id, /orders/:id/cancel | GET, GET, PATCH |
| Inventory | /inventory, /inventory/adjust | GET, PATCH |
| Catalog | /products, /categories | GET, CRUD |
| Promotions | /promotions, /promotions/validate | GET, CRUD, POST |
| Loyalty | /loyalty/customer/:id, /loyalty/points/* | GET, POST |
| Delivery | /delivery, /delivery/:id/track | GET, GET |
| Shifts | /shifts, /shifts/:id/clock-in | GET, CRUD, POST |
| Customers | /customers | GET, CRUD |
| Reports | /reports/sales, /reports/revenue | GET |

### Integration Example

```typescript
// Use Axios with automatic endpoint routing
import axiosInstance from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'

// Automatically goes to correct service
const users = await axiosInstance.get(endpoints.users.list)

// Post to orders service
const order = await axiosInstance.post(endpoints.orders.create, orderData)
```

## 🧪 Testing Recommendations

### Unit Tests (Component)
- Use Vitest
- Test UI components in isolation
- Mock Zustand stores

### Integration Tests
- Test component + store interactions
- Mock Axios
- Verify route guards work

### E2E Tests
- Use Playwright/Cypress
- Test complete user flows
- Verify RBAC enforcement

## 📱 Responsive Design

All components are mobile-first responsive:
- `sm:` (640px) → Tablets
- `md:` (768px) → Desktop
- `lg:` (1024px) → Wide screens

```html
<!-- Example responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

**Document Version**: 1.0
**Last Updated**: January 27, 2026
**Framework**: Next.js 14.2
