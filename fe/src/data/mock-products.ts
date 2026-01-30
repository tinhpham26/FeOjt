import { Product, Category } from '@/shared/types/product.types'

// Categories definition
export const CATEGORIES: Category[] = [
  { slug: 'trai-cay-tuoi', name: 'Trái cây tươi', icon: '🍎', description: 'Trái cây tươi ngon, nhập khẩu và trong nước' },
  { slug: 'rau-cu', name: 'Rau củ', icon: '🥬', description: 'Rau củ sạch, tươi mỗi ngày' },
  { slug: 'thit-ca', name: 'Thịt, cá', icon: '🥩', description: 'Thịt tươi, hải sản đảm bảo chất lượng' },
  { slug: 'gao-mi', name: 'Gạo, mì', icon: '🍚', description: 'Gạo, mì các loại chất lượng cao' },
  { slug: 'nuoc-uong', name: 'Nước uống', icon: '🥤', description: 'Nước giải khát các loại' },
  { slug: 'banh-keo', name: 'Bánh kẹo', icon: '🍪', description: 'Bánh kẹo, snack đa dạng' },
  { slug: 'khuyen-mai-hot', name: 'Khuyến mãi hot', icon: '🔥', description: 'Sản phẩm đang có ưu đãi đặc biệt' },
]

// Mock products data
export const MOCK_PRODUCTS: Product[] = [
  // Trái cây tươi
  { id: 1, name: 'Táo Fuji Nhật Bản', price: 89000, unit: 'kg', image: '🍎', categorySlug: 'trai-cay-tuoi', description: 'Táo Fuji nhập khẩu từ Nhật Bản, giòn ngọt', stock: 50 },
  { id: 2, name: 'Cam Úc cao cấp', price: 65000, unit: 'kg', image: '🍊', categorySlug: 'trai-cay-tuoi', description: 'Cam Úc tươi ngon, nhiều nước', stock: 80 },
  { id: 3, name: 'Xoài Cát Hòa Lộc', price: 45000, unit: 'kg', image: '🥭', categorySlug: 'trai-cay-tuoi', description: 'Xoài Cát Hòa Lộc đặc sản Tiền Giang', stock: 60 },
  { id: 4, name: 'Nho Mỹ không hạt', price: 120000, unit: 'kg', image: '🍇', categorySlug: 'trai-cay-tuoi', description: 'Nho Mỹ nhập khẩu không hạt', stock: 30 },
  { id: 5, name: 'Chuối già Nam Mỹ', price: 25000, unit: 'kg', image: '🍌', categorySlug: 'trai-cay-tuoi', description: 'Chuối già Nam Mỹ thơm ngon', stock: 100 },
  { id: 6, name: 'Dâu tây Đà Lạt', price: 150000, unit: 'hộp 250g', image: '🍓', categorySlug: 'trai-cay-tuoi', description: 'Dâu tây tươi từ Đà Lạt', stock: 40 },
  { id: 7, name: 'Dưa hấu không hạt', price: 35000, unit: 'kg', image: '🍉', categorySlug: 'trai-cay-tuoi', description: 'Dưa hấu đỏ không hạt ngọt mát', stock: 70 },
  { id: 8, name: 'Bơ Booth Úc', price: 85000, unit: 'kg', image: '🥑', categorySlug: 'trai-cay-tuoi', description: 'Bơ Booth nhập khẩu từ Úc', stock: 35 },

  // Rau củ
  { id: 9, name: 'Rau cải xanh', price: 12000, unit: 'bó', image: '🥬', categorySlug: 'rau-cu', description: 'Rau cải xanh tươi ngon', stock: 150 },
  { id: 10, name: 'Cà chua bi', price: 25000, unit: 'kg', image: '🍅', categorySlug: 'rau-cu', description: 'Cà chua bi tươi Đà Lạt', stock: 90 },
  { id: 11, name: 'Khoai tây Đà Lạt', price: 28000, unit: 'kg', image: '🥔', categorySlug: 'rau-cu', description: 'Khoai tây Đà Lạt chất lượng cao', stock: 120 },
  { id: 12, name: 'Cà rốt Đà Lạt', price: 22000, unit: 'kg', image: '🥕', categorySlug: 'rau-cu', description: 'Cà rốt tươi Đà Lạt', stock: 100 },
  { id: 13, name: 'Bông cải xanh', price: 35000, unit: 'kg', image: '🥦', categorySlug: 'rau-cu', description: 'Bông cải xanh nhập khẩu', stock: 60 },
  { id: 14, name: 'Cà tím', price: 18000, unit: 'kg', image: '🍆', categorySlug: 'rau-cu', description: 'Cà tím tươi ngon', stock: 80 },
  { id: 15, name: 'Súp lơ trắng', price: 32000, unit: 'kg', image: '🥬', categorySlug: 'rau-cu', description: 'Súp lơ trắng Đà Lạt', stock: 55 },
  { id: 16, name: 'Dưa chuột', price: 15000, unit: 'kg', image: '🥒', categorySlug: 'rau-cu', description: 'Dưa chuột tươi giòn', stock: 110 },

  // Thịt, cá
  { id: 17, name: 'Thịt ba chỉ heo', price: 129000, unit: 'kg', image: '🥩', categorySlug: 'thit-ca', description: 'Thịt ba chỉ heo tươi ngon', stock: 45 },
  { id: 18, name: 'Cá hồi Na Uy', price: 299000, unit: 'kg', image: '🐟', categorySlug: 'thit-ca', description: 'Cá hồi nhập khẩu Na Uy', stock: 25 },
  { id: 19, name: 'Tôm sú tươi', price: 199000, unit: 'kg', image: '🦐', categorySlug: 'thit-ca', description: 'Tôm sú tươi sống', stock: 30 },
  { id: 20, name: 'Gà ta nguyên con', price: 159000, unit: 'kg', image: '🍗', categorySlug: 'thit-ca', description: 'Gà ta thả vườn', stock: 40 },
  { id: 21, name: 'Thịt bò Úc', price: 249000, unit: 'kg', image: '🥩', categorySlug: 'thit-ca', description: 'Thịt bò nhập khẩu Úc', stock: 35 },
  { id: 22, name: 'Cá thu tươi', price: 89000, unit: 'kg', image: '🐟', categorySlug: 'thit-ca', description: 'Cá thu tươi đánh bắt trong ngày', stock: 50 },
  { id: 23, name: 'Mực ống tươi', price: 179000, unit: 'kg', image: '🦑', categorySlug: 'thit-ca', description: 'Mực ống tươi sống', stock: 28 },
  { id: 24, name: 'Sườn non heo', price: 139000, unit: 'kg', image: '🥩', categorySlug: 'thit-ca', description: 'Sườn non heo tươi', stock: 55 },

  // Gạo, mì
  { id: 25, name: 'Gạo ST25 cao cấp', price: 89000, unit: 'kg', image: '🌾', categorySlug: 'gao-mi', description: 'Gạo ST25 thơm dẻo', stock: 200 },
  { id: 26, name: 'Mì ý Barilla', price: 45000, unit: 'gói 500g', image: '🍝', categorySlug: 'gao-mi', description: 'Mì ý nhập khẩu Ý', stock: 150 },
  { id: 27, name: 'Gạo Jasmine Thái Lan', price: 65000, unit: 'kg', image: '🌾', categorySlug: 'gao-mi', description: 'Gạo Jasmine hạt dài thơm', stock: 180 },
  { id: 28, name: 'Bún tươi', price: 18000, unit: 'kg', image: '🍜', categorySlug: 'gao-mi', description: 'Bún tươi sạch', stock: 100 },
  { id: 29, name: 'Miến dong', price: 35000, unit: 'gói 500g', image: '🍜', categorySlug: 'gao-mi', description: 'Miến dong cao cấp', stock: 120 },
  { id: 30, name: 'Phở khô', price: 25000, unit: 'gói 500g', image: '🍜', categorySlug: 'gao-mi', description: 'Phở khô Phú Thọ', stock: 140 },
  { id: 31, name: 'Gạo lứt hữu cơ', price: 75000, unit: 'kg', image: '🌾', categorySlug: 'gao-mi', description: 'Gạo lứt hữu cơ dinh dưỡng', stock: 90 },
  { id: 32, name: 'Mì Udon Nhật Bản', price: 55000, unit: 'gói 500g', image: '🍜', categorySlug: 'gao-mi', description: 'Mì Udon nhập khẩu Nhật', stock: 85 },

  // Nước uống
  { id: 33, name: 'Coca Cola 1.5L', price: 18000, unit: 'chai', image: '🥤', categorySlug: 'nuoc-uong', description: 'Nước ngọt Coca Cola', stock: 300 },
  { id: 34, name: 'Pepsi lon 330ml', price: 9000, unit: 'lon', image: '🥤', categorySlug: 'nuoc-uong', description: 'Pepsi lon mini', stock: 500 },
  { id: 35, name: 'Nước khoáng Lavie', price: 5000, unit: 'chai 500ml', image: '💧', categorySlug: 'nuoc-uong', description: 'Nước khoáng tinh khiết', stock: 600 },
  { id: 36, name: 'Trà xanh không độ', price: 10000, unit: 'chai 450ml', image: '🍵', categorySlug: 'nuoc-uong', description: 'Trà xanh không đường', stock: 400 },
  { id: 37, name: 'Nước cam Tropicana', price: 35000, unit: 'hộp 1L', image: '🧃', categorySlug: 'nuoc-uong', description: 'Nước cam ép 100%', stock: 200 },
  { id: 38, name: 'Sting dâu 330ml', price: 10000, unit: 'chai', image: '🥤', categorySlug: 'nuoc-uong', description: 'Nước tăng lực Sting', stock: 350 },
  { id: 39, name: 'Sữa tươi Vinamilk', price: 32000, unit: 'hộp 1L', image: '🥛', categorySlug: 'nuoc-uong', description: 'Sữa tươi tiệt trùng', stock: 250 },
  { id: 40, name: 'Cà phê đen Highlands', price: 45000, unit: 'chai 250ml', image: '☕', categorySlug: 'nuoc-uong', description: 'Cà phê đen đá xay', stock: 180 },

  // Bánh kẹo
  { id: 41, name: 'Bánh Oreo 137g', price: 32000, unit: 'gói', image: '🍪', categorySlug: 'banh-keo', description: 'Bánh quy Oreo socola', stock: 200 },
  { id: 42, name: 'Snack Oishi', price: 15000, unit: 'gói', image: '🍿', categorySlug: 'banh-keo', description: 'Snack khoai tây vị tự nhiên', stock: 300 },
  { id: 43, name: 'Kẹo dẻo Haribo', price: 45000, unit: 'gói 200g', image: '🍬', categorySlug: 'banh-keo', description: 'Kẹo dẻo hương trái cây', stock: 150 },
  { id: 44, name: 'Bánh quy bơ Danisa', price: 89000, unit: 'hộp 454g', image: '🍪', categorySlug: 'banh-keo', description: 'Bánh quy bơ Đan Mạch', stock: 120 },
  { id: 45, name: 'Socola Dairy Milk', price: 55000, unit: 'thanh 165g', image: '🍫', categorySlug: 'banh-keo', description: 'Socola sữa Cadbury', stock: 180 },
  { id: 46, name: 'Kẹo Alpenliebe', price: 25000, unit: 'gói 120g', image: '🍬', categorySlug: 'banh-keo', description: 'Kẹo sữa Alpenliebe', stock: 250 },
  { id: 47, name: 'Bánh Chocopie', price: 42000, unit: 'hộp 12 cái', image: '🍪', categorySlug: 'banh-keo', description: 'Bánh Chocopie Orion', stock: 160 },
  { id: 48, name: 'Snack Pringles', price: 65000, unit: 'tuýp 107g', image: '🥔', categorySlug: 'banh-keo', description: 'Snack khoai tây Pringles', stock: 140 },

  // Khuyến mãi hot (các sản phẩm giảm giá)
  { id: 49, name: 'Táo Fuji Nhật Bản', price: 49000, originalPrice: 89000, unit: 'kg', image: '🍎', categorySlug: 'khuyen-mai-hot', description: 'Táo Fuji giảm giá 45%', stock: 30, discount: 45 },
  { id: 50, name: 'Thịt ba chỉ heo', price: 89000, originalPrice: 129000, unit: 'kg', image: '🥩', categorySlug: 'khuyen-mai-hot', description: 'Thịt ba chỉ giảm giá 31%', stock: 25, discount: 31 },
  { id: 51, name: 'Cá hồi Na Uy', price: 199000, originalPrice: 299000, unit: 'kg', image: '🐟', categorySlug: 'khuyen-mai-hot', description: 'Cá hồi giảm giá 33%', stock: 15, discount: 33 },
  { id: 52, name: 'Gạo ST25', price: 59000, originalPrice: 89000, unit: 'kg', image: '🌾', categorySlug: 'khuyen-mai-hot', description: 'Gạo ST25 giảm giá 34%', stock: 100, discount: 34 },
  { id: 53, name: 'Coca Cola 1.5L', price: 12000, originalPrice: 18000, unit: 'chai', image: '🥤', categorySlug: 'khuyen-mai-hot', description: 'Coca giảm giá 33%', stock: 200, discount: 33 },
  { id: 54, name: 'Bánh Oreo', price: 22000, originalPrice: 32000, unit: 'gói', image: '🍪', categorySlug: 'khuyen-mai-hot', description: 'Oreo giảm giá 31%', stock: 150, discount: 31 },
  { id: 55, name: 'Nho Mỹ không hạt', price: 79000, originalPrice: 120000, unit: 'kg', image: '🍇', categorySlug: 'khuyen-mai-hot', description: 'Nho Mỹ giảm giá 34%', stock: 20, discount: 34 },
  { id: 56, name: 'Tôm sú tươi', price: 139000, originalPrice: 199000, unit: 'kg', image: '🦐', categorySlug: 'khuyen-mai-hot', description: 'Tôm sú giảm giá 30%', stock: 18, discount: 30 },
]
