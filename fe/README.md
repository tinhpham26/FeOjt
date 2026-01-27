# Retail Chain Management System - Frontend

This is a complete Next.js App Router frontend skeleton for an enterprise retail chain system.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios with interceptors
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Architecture**: Microservices with API Gateway

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (admin)/             # Admin console routes
│   ├── (ops)/               # Operations routes
│   ├── (customer)/          # Customer portal routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── middleware.ts        # Request middleware
│   └── globals.css          # Global styles
├── features/                # Feature modules
│   ├── iam/                 # Identity & Access Management
│   ├── orders/              # Order management (online + POS)
│   ├── inventory/           # Inventory management
│   ├── catalog/             # Products & categories
│   ├── promotions/          # Promotions & discounts
│   ├── loyalty/             # Loyalty program
│   ├── reporting/           # Reports & analytics
│   ├── shifts/              # Staff shift management
│   ├── delivery/            # Delivery tracking
│   └── customers/           # Customer management
├── shared/                  # Shared utilities
│   ├── api/                 # API layer (http.ts, endpoints.ts)
│   ├── auth/                # RBAC components
│   ├── config/              # Configuration
│   ├── ui/                  # Reusable UI components
│   ├── utils/               # Utility functions
│   └── types/               # TypeScript types
└── store/                   # Zustand stores
    ├── auth.store.ts        # Authentication state
    └── ui.store.ts          # UI state

```

## Features

### RBAC System
- 5 Roles: CUSTOMER, STAFF, STORE_MANAGER, WAREHOUSE_MANAGER, ADMIN
- 12 Permissions: IAM, PRODUCT, INVENTORY, ORDERS, SHIFTS, DELIVERY, PROMO, LOYALTY, REPORT, CUSTOMER
- Route guards and UI-level permission guards
- Dynamic sidebar navigation based on permissions

### Route Groups
- **(auth)**: Public authentication pages (login, forgot-password)
- **(admin)**: Admin-only dashboard and management pages
- **(ops)**: Operations dashboard (for STAFF, STORE_MANAGER, WAREHOUSE_MANAGER)
- **(customer)**: Customer portal for online orders and account management

### API Integration
- Supports both API Gateway and per-service microservice URLs
- Axios instance with request/response interceptors
- Centralized error handling
- TanStack Query for efficient data fetching with caching

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Update API URLs for your backend services
3. Configure other environment variables as needed

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## Authentication Flow

1. User visits `/auth/login`
2. Submits credentials via React Hook Form + Zod validation
3. API call to IAM service returns JWT token and user role
4. Token stored in cookies and Zustand store
5. Middleware checks token and role for protected routes
6. Redirect to appropriate dashboard based on role

## Permission System

### Permission Types
- **IAM_READ, IAM_WRITE**: User and role management
- **PRODUCT_READ, PRODUCT_WRITE**: Product catalog operations
- **INVENTORY_READ, INVENTORY_WRITE**: Stock management
- **ORDER_ONLINE_READ, ORDER_ONLINE_WRITE**: Online order management
- **ORDER_POS_READ, ORDER_POS_WRITE**: Point of sale operations
- **SHIFT_READ, SHIFT_WRITE**: Shift scheduling
- **DELIVERY_READ, DELIVERY_WRITE**: Delivery management
- **PROMO_READ, PROMO_WRITE**: Promotions and discounts
- **LOYALTY_READ, LOYALTY_WRITE**: Loyalty program management
- **REPORT_READ**: Reports and analytics
- **CUSTOMER_READ, CUSTOMER_WRITE**: Customer data management

### Default Role Permissions

**ADMIN**: All permissions

**STORE_MANAGER**:
- ORDER_ONLINE_READ, ORDER_ONLINE_WRITE
- ORDER_POS_READ, ORDER_POS_WRITE
- SHIFT_READ, SHIFT_WRITE
- INVENTORY_READ
- REPORT_READ
- CUSTOMER_READ

**WAREHOUSE_MANAGER**:
- INVENTORY_READ, INVENTORY_WRITE
- ORDER_ONLINE_READ
- REPORT_READ

**STAFF**: Permissions assigned per user by backend

**CUSTOMER**: Customer routes only

## API Configuration

### Via API Gateway
Set `NEXT_PUBLIC_API_BASE_URL` and the HTTP client will use that for all requests.

### Via Per-Service URLs
Each service has its own URL (e.g., `NEXT_PUBLIC_IAM_URL`, `NEXT_PUBLIC_ORDER_URL`).

The HTTP client automatically routes requests to the appropriate service.

## UI Components

Reusable components in `src/shared/ui/`:

- **Button.tsx**: Primary and secondary buttons
- **Input.tsx**: Text input with validation states
- **Modal.tsx**: Dialog/modal component
- **Drawer.tsx**: Side drawer component
- **DataTable.tsx**: Table with sorting/filtering
- **PageHeader.tsx**: Page title and breadcrumbs
- **FilterBar.tsx**: Search and filter controls
- **EmptyState.tsx**: Empty state illustrations
- **Skeleton.tsx**: Loading skeletons

All components use TailwindCSS and support dark mode.

## Hooks & Utilities

### Custom Hooks
- `useAuth()`: Access auth state
- `usePermission()`: Check user permissions
- `useApi()`: Make API requests
- Feature-specific hooks in each module

### Utilities
- `cn()`: Classname merging
- `formatDate()`: Date formatting
- `formatCurrency()`: Currency formatting
- API error normalization

## Development Guidelines

1. **Component Structure**: Keep components small and focused
2. **Type Safety**: Always use TypeScript types, avoid `any`
3. **Error Handling**: Use centralized error handling in API layer
4. **State Management**: Use Zustand for global state, React state for local
5. **API Calls**: Use TanStack Query with proper caching strategy
6. **Forms**: Use React Hook Form + Zod for all user inputs
7. **Styling**: Use TailwindCSS classes, avoid inline styles
8. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Contributing

See CONTRIBUTING.md for guidelines.

## License

MIT
