# Project Initialization & Running Instructions

## ✅ Complete Project Structure

The frontend skeleton has been fully generated with the following structure:

```
d:\OJT_09\FE/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (admin)/                   # Admin route group
│   │   │   ├── catalog/
│   │   │   │   ├── categories/page.tsx
│   │   │   │   └── products/page.tsx
│   │   │   ├── customers/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── promotions/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (auth)/                    # Authentication route group
│   │   │   ├── login/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (customer)/                # Customer route group
│   │   │   ├── orders/page.tsx
│   │   │   ├── loyalty/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (ops)/                     # Operations route group
│   │   │   ├── inventory/page.tsx
│   │   │   ├── shifts/page.tsx
│   │   │   ├── delivery/page.tsx
│   │   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── middleware.ts
│   │   └── page.tsx
│   ├── shared/                        # Shared utilities
│   │   ├── api/
│   │   │   ├── http.ts                # Axios instance + interceptors
│   │   │   ├── endpoints.ts           # API endpoint mappings
│   │   │   └── errors.ts              # Error normalization
│   │   ├── auth/
│   │   │   ├── permission-map.ts      # RBAC permission matrix
│   │   │   ├── RouteGuard.tsx         # Route protection component
│   │   │   └── PermissionGuard.tsx    # UI-level permission guard
│   │   ├── config/
│   │   │   └── nav.ts                 # Navigation configuration
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript interfaces
│   │   ├── ui/                        # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── Skeleton.tsx
│   │   └── utils/
│   │       └── format.ts              # Formatting utilities
│   └── store/                         # Zustand stores
│       ├── auth.store.ts              # Authentication state
│       └── ui.store.ts                # UI state
├── .env.example                       # Environment variables template
├── .eslintrc.json                     # ESLint configuration
├── .gitignore                         # Git ignore rules
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies
├── postcss.config.js                  # PostCSS configuration
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.js                 # Tailwind CSS configuration
└── README.md                          # Project documentation
```

## 🚀 Quick Start

### 1. Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Environment Setup

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your backend API URLs:

```env
# API Gateway (Primary)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Or use per-service URLs
NEXT_PUBLIC_IAM_URL=http://localhost:3002
NEXT_PUBLIC_ORDER_URL=http://localhost:3003
# ... etc
```

### 3. Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

Build for production:

```bash
npm run build
npm start
```

### 5. Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

## 📋 Features Implemented

### Route Groups ✅
- **(auth)**: Login, forgot-password
- **(admin)**: Admin dashboard, user management, catalog, inventory, promotions, reports
- **(ops)**: Operations dashboard, inventory, shifts, delivery
- **(customer)**: Customer dashboard, orders, loyalty, profile

### Core Infrastructure ✅
- Axios HTTP client with interceptors
- TanStack Query-ready endpoints configuration
- Zustand stores for auth and UI state
- TypeScript types for all data models
- Middleware for route protection

### RBAC System ✅
- 5 Roles: CUSTOMER, STAFF, STORE_MANAGER, WAREHOUSE_MANAGER, ADMIN
- 12 Permissions: IAM_*, PRODUCT_*, INVENTORY_*, ORDER_*, SHIFT_*, DELIVERY_*, PROMO_*, LOYALTY_*, REPORT_*, CUSTOMER_*
- RouteGuard component for route-level protection
- PermissionGuard component for UI-level protection
- Permission matrix mapping roles to permissions

### Reusable UI Components ✅
- Button (with variants: primary, secondary, danger, outline)
- Input (with validation states)
- Modal (with title and footer)
- Drawer (side panel)
- DataTable (with sorting, filtering)
- PageHeader (with breadcrumbs)
- FilterBar (with reset)
- EmptyState (with actions)
- Skeleton (loading placeholders)

### Styling ✅
- TailwindCSS with custom color theme
- Responsive design utilities
- Component-level CSS classes
- Global CSS with utility layer

### Forms & Validation ✅
- React Hook Form integration
- Zod validation schemas
- Error display and feedback

## 🔌 API Configuration

The project supports two API configurations:

### Option 1: API Gateway (Recommended)
Use `NEXT_PUBLIC_API_BASE_URL` for a single entry point:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

All requests route through the gateway.

### Option 2: Per-Service URLs
Use individual service URLs for microservices:

```env
NEXT_PUBLIC_IAM_URL=http://localhost:3002
NEXT_PUBLIC_ORDER_URL=http://localhost:3003
NEXT_PUBLIC_INVENTORY_URL=http://localhost:3004
# ... etc
```

The HTTP client automatically routes requests based on the endpoint.

## 📝 Key Files

- [src/shared/api/http.ts](src/shared/api/http.ts) - Axios instance with interceptors
- [src/shared/auth/permission-map.ts](src/shared/auth/permission-map.ts) - RBAC matrix
- [src/store/auth.store.ts](src/store/auth.store.ts) - Authentication state
- [src/app/middleware.ts](src/app/middleware.ts) - Route protection middleware
- [.env.example](.env.example) - Environment template

## 🧪 Testing & Development

### Development Tips

1. **Hot Reload**: Changes to components reload automatically
2. **Type Safety**: Run `npm run type-check` to validate TypeScript
3. **Linting**: Run `npm run lint` to check code style
4. **Debug**: Use browser DevTools and React DevTools

### Mock Authentication

For development, use these demo credentials:

- **Email**: admin@example.com
- **Password**: password123
- **Role**: ADMIN

Or use any email with the customer/staff roles for testing other personas.

## 📦 Dependencies

- **Next.js 14.2**: Full-stack React framework
- **TypeScript 5.4**: Type-safe JavaScript
- **TailwindCSS 3.4**: Utility-first CSS
- **Axios 1.7**: HTTP client
- **React Hook Form 7.52**: Form management
- **Zod 3.23**: Schema validation
- **Zustand 4.5**: State management
- **@tanstack/react-query 5.51**: Server state management (ready to use)

## 🔒 Security Considerations

1. **Token Storage**: Tokens stored in localStorage and cookies
2. **Interceptors**: Automatic 401/403 handling
3. **Route Guards**: Middleware checks tokens and roles
4. **HTTPS**: Always use HTTPS in production
5. **Environment Variables**: Never commit `.env.local`

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check environment: Ensure `.env.local` is properly configured

### Module Not Found

Ensure all imports use the `@/*` path alias defined in `tsconfig.json`.

### CORS Issues

If you see CORS errors, ensure your backend is configured to allow requests from `localhost:3000`.

## 📚 Next Steps

1. **Implement Features**: Add forms and API integration to each page
2. **Add TanStack Query**: Use `useQuery` and `useMutation` for data fetching
3. **Customize UI**: Modify TailwindCSS theme in `tailwind.config.js`
4. **Backend Integration**: Update API endpoints in `src/shared/api/endpoints.ts`
5. **Testing**: Add Vitest/Jest tests for components and utils

## 📧 Support

For questions or issues with Next.js, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [React Hook Form Docs](https://react-hook-form.com/)

---

**Project Generated**: January 27, 2026
**Next.js Version**: 14.2.35
**Status**: ✅ Ready for Development
