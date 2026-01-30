export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  unit: string
  image: string // URL hoặc emoji placeholder
  categorySlug: string
  description?: string
  stock?: number
  discount?: number
}

export interface Category {
  slug: string
  name: string
  icon: string
  description: string
  image?: string
}

export type CategorySlug = 
  | 'trai-cay-tuoi' 
  | 'rau-cu' 
  | 'thit-ca' 
  | 'gao-mi' 
  | 'nuoc-uong' 
  | 'banh-keo' 
  | 'khuyen-mai-hot'
