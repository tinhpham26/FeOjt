# 🚀 Quick Implementation Guide - Admin Sidebar

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (if not already installed)
```bash
npm install lucide-react
```

### Step 2: Files Already Created
✅ `src/shared/config/nav.ts` - Navigation structure  
✅ `src/shared/ui/Sidebar/AdminSidebar.tsx` - Sidebar component  
✅ `src/app/(admin)/layout.tsx` - Admin layout integration  

### Step 3: Run the Application
```bash
npm run dev
```

Visit: `http://localhost:3000/admin/dashboard`

---

## 🎯 How It Works

### Navigation Structure (`nav.ts`)
```typescript
export interface NavGroup {
  label: string        // Group name (e.g., "Tổng quan")
  items: NavItem[]     // Menu items in this group
}

export interface NavItem {
  label: string        // Display text
  href: string         // Route path
  icon?: string        // Lucide icon name
}
```

### Usage in Layout
```tsx
import { AdminSidebar } from '@/shared/ui/Sidebar/AdminSidebar'
import { getAdminNavigation } from '@/shared/config/nav'

function AdminLayout({ children }) {
  const navGroups = getAdminNavigation()
  
  return (
    <div className="flex h-screen">
      <AdminSidebar 
        navigation={navGroups}
        isCollapsed={false}
        onToggleCollapse={() => {}}
      />
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

---

## 📝 Adding New Menu Items

### Example: Add "Suppliers" to Inventory Group

1. **Open** `src/shared/config/nav.ts`

2. **Find** the "Kho & Tồn kho" group:
```typescript
{
  label: 'Kho & Tồn kho',
  items: [
    // ... existing items
  ],
},
```

3. **Add** your new item:
```typescript
{
  label: 'Kho & Tồn kho',
  items: [
    {
      label: 'Inventory Overview',
      href: '/admin/inventory',
      icon: 'Warehouse',
    },
    // ⬇️ ADD THIS
    {
      label: 'Suppliers',
      href: '/admin/inventory/suppliers',
      icon: 'Building2',  // New icon
    },
    // ... rest of items
  ],
},
```

4. **Import** the icon in `AdminSidebar.tsx`:
```typescript
import {
  // ... existing imports
  Building2,  // ⬅️ ADD THIS
} from 'lucide-react'

const iconMap = {
  // ... existing icons
  Building2,  // ⬅️ ADD THIS
}
```

5. **Create** the page component:
```tsx
// src/app/(admin)/inventory/suppliers/page.tsx
export default function SuppliersPage() {
  return <div>Suppliers Page</div>
}
```

---

## 🎨 Customization Guide

### Change Sidebar Width
```tsx
// In AdminSidebar.tsx, line ~70
className={`${
  isCollapsed ? 'w-20' : 'w-72'  // ⬅️ Change to 'w-80' or 'w-64'
} ...`}
```

### Change Primary Color (Green → Blue)
```tsx
// Replace all emerald colors with blue
bg-emerald-600 → bg-blue-600
text-emerald-400 → text-blue-400
from-emerald-500 → from-blue-500
```

### Disable Group Expansion
```tsx
// In AdminSidebar.tsx, line ~125
const isGroupExpanded = true  // Always expanded
```

### Change Icon Size
```tsx
// In AdminSidebar.tsx, line ~48
<Icon className="w-5 h-5" />  // Change to "w-6 h-6" for larger
```

---

## 🔧 Troubleshooting

### Icons Not Showing
**Problem:** Icons appear as empty boxes  
**Solution:** Check icon name matches import
```tsx
// WRONG
icon: 'users'  // lowercase

// CORRECT
icon: 'Users'  // PascalCase
```

### Sidebar Not Collapsing
**Problem:** Click toggle button but nothing happens  
**Solution:** Check UI store is connected
```tsx
import { useUIStore } from '@/store/ui.store'

const { sidebarOpen, toggleSidebar } = useUIStore()

<AdminSidebar 
  isCollapsed={!sidebarOpen}  // ⬅️ Must be connected
  onToggleCollapse={toggleSidebar}
/>
```

### Active State Not Highlighting
**Problem:** Menu item not highlighted on active route  
**Solution:** Check route path matches exactly
```tsx
// If current page is /admin/catalog/products
href: '/admin/catalog/products'  // ✅ Works
href: '/admin/catalog'            // ❌ Won't highlight
```

### TypeScript Errors
**Problem:** Type errors in navigation config  
**Solution:** Ensure NavGroup structure is correct
```typescript
// WRONG
const nav = [
  { label: 'Dashboard', href: '/' }
]

// CORRECT
const nav: NavGroup[] = [
  {
    label: 'Group Name',
    items: [
      { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' }
    ]
  }
]
```

---

## 🎯 Common Tasks

### Make Sidebar Start Collapsed on Mobile
```tsx
// In ui.store.ts
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: typeof window !== 'undefined' && window.innerWidth >= 1024,
  // ... rest
}))
```

### Add Notification Badge
```tsx
// In AdminSidebar.tsx, inside menu item rendering
<Link href={item.href} className="...">
  {getIcon(item.icon)}
  {!isCollapsed && <span>{item.label}</span>}
  {/* ⬇️ ADD THIS */}
  {item.badge && (
    <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
      {item.badge}
    </span>
  )}
</Link>
```

### Add Search Functionality
```tsx
// Add to top of sidebar
<div className="p-4">
  <input
    type="text"
    placeholder="Search menu..."
    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg"
    onChange={(e) => filterNavigation(e.target.value)}
  />
</div>
```

### Add Keyboard Shortcuts
```tsx
// Example: Cmd/Ctrl + K to open search
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      // Open search or command palette
    }
  }
  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

---

## 📦 File Structure

```
src/
├── shared/
│   ├── config/
│   │   └── nav.ts                          # 🔧 Edit to add/remove menu items
│   │
│   └── ui/
│       └── Sidebar/
│           └── AdminSidebar.tsx            # 🎨 Edit for styling/behavior
│
├── app/
│   └── (admin)/
│       ├── layout.tsx                      # ✅ Already integrated
│       │
│       ├── dashboard/
│       │   └── page.tsx                    # Dashboard page
│       │
│       ├── users/
│       │   └── page.tsx                    # Users page
│       │
│       ├── catalog/
│       │   ├── products/
│       │   │   └── page.tsx                # Products page
│       │   └── categories/
│       │       └── page.tsx                # Categories page
│       │
│       └── [other admin pages...]
│
└── store/
    └── ui.store.ts                         # Sidebar state management
```

---

## 🚦 Testing Checklist

- [ ] Sidebar renders on admin pages
- [ ] Toggle button collapses/expands sidebar
- [ ] Active menu item highlights correctly
- [ ] Group headers expand/collapse
- [ ] Icons display properly
- [ ] Tooltips show in collapsed mode
- [ ] Navigation links work correctly
- [ ] Responsive on mobile devices
- [ ] Smooth transitions/animations
- [ ] No console errors

---

## 📚 Related Documentation

- **Full Design Doc:** [ADMIN_SIDEBAR_REDESIGN.md](./ADMIN_SIDEBAR_REDESIGN.md)
- **Icon Reference:** [ADMIN_SIDEBAR_ICONS.md](./ADMIN_SIDEBAR_ICONS.md)
- **Lucide Icons:** https://lucide.dev
- **Tailwind CSS:** https://tailwindcss.com

---

## 🆘 Need Help?

### Quick Debug Steps
1. Check browser console for errors
2. Verify all files exist in correct locations
3. Ensure lucide-react is installed (`npm list lucide-react`)
4. Check TypeScript compilation (`npm run type-check`)
5. Restart dev server (`npm run dev`)

### Common Questions

**Q: Can I use different icons?**  
A: Yes! Browse https://lucide.dev, find your icon, add to `iconMap`

**Q: How do I hide menu items based on permissions?**  
A: Filter `navGroups` based on user permissions before passing to sidebar

**Q: Can I have nested groups?**  
A: Current version supports 1 level. For nesting, modify `NavGroup` interface

**Q: Is it accessible?**  
A: Yes - keyboard navigation, ARIA labels, and screen reader support included

---

## 🎉 You're Ready!

The sidebar is fully functional and ready to use. Just navigate to any admin page to see it in action.

**Test it:** http://localhost:3000/admin/dashboard

---

**Quick Reference Card:**
```
📁 Navigation Config: src/shared/config/nav.ts
🎨 Sidebar Component: src/shared/ui/Sidebar/AdminSidebar.tsx
🔧 Layout Integration: src/app/(admin)/layout.tsx
📦 State Management: src/store/ui.store.ts
🎯 Icons Library: lucide-react
```

---

**Last Updated:** February 2, 2026  
**Status:** Production Ready ✅  
**Version:** 2.0.0
