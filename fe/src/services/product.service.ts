import { Product, Category, CategorySlug } from '@/shared/types/product.types'
import { MOCK_PRODUCTS, CATEGORIES } from '@/data/mock-products'

/**
 * Product Service
 * 
 * TODO: Thay thế mock data bằng API calls khi có backend
 * Các function này đã được chuẩn bị để dễ dàng migrate sang API
 */

/**
 * Get all categories
 * 
 * @returns Promise<Category[]>
 * 
 * TODO [API Integration]:
 * return fetch('/api/categories').then(res => res.json())
 */
export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return CATEGORIES
}

/**
 * Get category by slug
 * 
 * @param slug - Category slug
 * @returns Promise<Category | undefined>
 * 
 * TODO [API Integration]:
 * return fetch(`/api/categories/${slug}`).then(res => res.json())
 */
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return CATEGORIES.find(cat => cat.slug === slug)
}

/**
 * Get products by category slug
 * 
 * @param categorySlug - Category slug to filter products
 * @returns Promise<Product[]>
 * 
 * TODO [API Integration]:
 * return fetch(`/api/products?category=${categorySlug}`).then(res => res.json())
 */
export async function getProductsByCategory(categorySlug: CategorySlug): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // Filter products by category
  return MOCK_PRODUCTS.filter(product => product.categorySlug === categorySlug)
}

/**
 * Get all products
 * 
 * @returns Promise<Product[]>
 * 
 * TODO [API Integration]:
 * return fetch('/api/products').then(res => res.json())
 */
export async function getAllProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return MOCK_PRODUCTS
}

/**
 * Get product by ID
 * 
 * @param id - Product ID
 * @returns Promise<Product | undefined>
 * 
 * TODO [API Integration]:
 * return fetch(`/api/products/${id}`).then(res => res.json())
 */
export async function getProductById(id: number): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 150))
  return MOCK_PRODUCTS.find(product => product.id === id)
}

/**
 * Search products by keyword
 * 
 * @param keyword - Search keyword
 * @returns Promise<Product[]>
 * 
 * TODO [API Integration]:
 * return fetch(`/api/products/search?q=${keyword}`).then(res => res.json())
 */
export async function searchProducts(keyword: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const lowerKeyword = keyword.toLowerCase()
  return MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowerKeyword) ||
    product.description?.toLowerCase().includes(lowerKeyword)
  )
}
