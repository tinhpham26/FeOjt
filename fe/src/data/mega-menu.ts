export interface SubCategory {
  id: string
  name: string
  slug: string
}

export interface MegaMenuCategory {
  id: string
  name: string
  slug: string
  color: string
  imagePrompt: string
  subCategories: SubCategory[]
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: 'gia-sieu-re',
    name: 'Giá Siêu Rẻ',
    slug: 'gia-sieu-re',
    color: '#10b981',
    imagePrompt: 'A single red sale tag with percentage symbol, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: []
  },
  {
    id: 'sua-cac-loai',
    name: 'Sữa các loại',
    slug: 'sua-cac-loai',
    color: '#3b82f6',
    imagePrompt: 'A single carton of fresh milk, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'sua-tuoi', name: 'Sữa Tươi', slug: 'sua-tuoi' },
      { id: 'sua-chua', name: 'Sữa Chua', slug: 'sua-chua' },
      { id: 'sua-bot', name: 'Sữa Bột', slug: 'sua-bot' },
      { id: 'sua-dac', name: 'Sữa Đặc', slug: 'sua-dac' },
      { id: 'sua-hat', name: 'Sữa Hạt', slug: 'sua-hat' },
    ]
  },
  {
    id: 'rau-cu-trai-cay',
    name: 'Rau - Củ - Trái Cây',
    slug: 'rau-cu-trai-cay',
    color: '#22c55e',
    imagePrompt: 'A single fresh green lettuce or leafy vegetable, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic produce, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'rau-cu', name: 'Rau Củ Tươi', slug: 'rau-cu' },
      { id: 'trai-cay-trong-nuoc', name: 'Trái Cây Trong Nước', slug: 'trai-cay-trong-nuoc' },
      { id: 'trai-cay-nhap-khau', name: 'Trái Cây Nhập Khẩu', slug: 'trai-cay-nhap-khau' },
      { id: 'rau-qua-cat-san', name: 'Rau Quả Cắt Sẵn', slug: 'rau-qua-cat-san' },
    ]
  },
  {
    id: 'hoa-pham-tay-rua',
    name: 'Hóa Phẩm - Tẩy rửa',
    slug: 'hoa-pham-tay-rua',
    color: '#06b6d4',
    imagePrompt: 'A single bottle of liquid detergent or dish soap, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'nuoc-giat', name: 'Nước Giặt', slug: 'nuoc-giat' },
      { id: 'nuoc-rua-chen', name: 'Nước Rửa Chén', slug: 'nuoc-rua-chen' },
      { id: 'nuoc-lau-nha', name: 'Nước Lau Nhà', slug: 'nuoc-lau-nha' },
      { id: 'nuoc-xa-vai', name: 'Nước Xả Vải', slug: 'nuoc-xa-vai' },
      { id: 'bot-giat', name: 'Bột Giặt', slug: 'bot-giat' },
    ]
  },
  {
    id: 'cham-soc-ca-nhan',
    name: 'Chăm Sóc Cá Nhân',
    slug: 'cham-soc-ca-nhan',
    color: '#ec4899',
    imagePrompt: 'A single bottle of body wash or shower gel with pink pump, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'cham-soc-rang-mieng', name: 'Chăm Sóc Răng Miệng', slug: 'cham-soc-rang-mieng' },
      { id: 'cham-soc-da', name: 'Chăm Sóc Da', slug: 'cham-soc-da' },
      { id: 'cham-soc-toc', name: 'Chăm Sóc Tóc', slug: 'cham-soc-toc' },
      { id: 'cham-soc-phu-nu', name: 'Chăm Sóc Phụ Nữ', slug: 'cham-soc-phu-nu' },
      { id: 'cham-soc-ca-nhan-khac', name: 'Chăm Sóc Cá Nhân Khác', slug: 'cham-soc-ca-nhan-khac' },
      { id: 'my-pham', name: 'Mỹ Phẩm', slug: 'my-pham' },
      { id: 'khan-giay-khan-uot', name: 'Khăn Giấy - Khăn Ướt', slug: 'khan-giay-khan-uot' },
    ]
  },
  {
    id: 'thit-hai-san-tuoi',
    name: 'Thịt - Hải Sản Tươi',
    slug: 'thit-hai-san-tuoi',
    color: '#ef4444',
    imagePrompt: 'A single piece of fresh raw meat on white tray, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic butcher product, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'thit-heo', name: 'Thịt Heo', slug: 'thit-heo' },
      { id: 'thit-bo', name: 'Thịt Bò', slug: 'thit-bo' },
      { id: 'thit-ga-vit', name: 'Thịt Gà - Vịt', slug: 'thit-ga-vit' },
      { id: 'hai-san', name: 'Hải Sản', slug: 'hai-san' },
      { id: 'ca-tuoi-song', name: 'Cá Tươi Sống', slug: 'ca-tuoi-song' },
    ]
  },
  {
    id: 'banh-keo',
    name: 'Bánh Kẹo',
    slug: 'banh-keo',
    color: '#f59e0b',
    imagePrompt: 'A single pack of cookies or biscuits, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic snack packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'banh-quy', name: 'Bánh Quy', slug: 'banh-quy' },
      { id: 'keo', name: 'Kẹo', slug: 'keo' },
      { id: 'banh-keo-socola', name: 'Bánh Kẹo Socola', slug: 'banh-keo-socola' },
      { id: 'snack', name: 'Snack', slug: 'snack' },
      { id: 'banh-mi', name: 'Bánh Mì', slug: 'banh-mi' },
    ]
  },
  {
    id: 'do-uong-co-con',
    name: 'Đồ uống có cồn',
    slug: 'do-uong-co-con',
    color: '#8b5cf6',
    imagePrompt: 'A single beer can or bottle, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic beverage packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'bia', name: 'Bia', slug: 'bia' },
      { id: 'ruou-vang', name: 'Rượu Vang', slug: 'ruou-vang' },
      { id: 'ruou-manh', name: 'Rượu Mạnh', slug: 'ruou-manh' },
    ]
  },
  {
    id: 'do-uong-giai-khat',
    name: 'Đồ Uống - Giải Khát',
    slug: 'do-uong-giai-khat',
    color: '#06b6d4',
    imagePrompt: 'A single bottle of soft drink or beverage, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic drink packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'nuoc-ngot', name: 'Nước Ngọt', slug: 'nuoc-ngot' },
      { id: 'nuoc-khoang', name: 'Nước Khoáng', slug: 'nuoc-khoang' },
      { id: 'tra-cafe', name: 'Trà - Cafe', slug: 'tra-cafe' },
      { id: 'nuoc-tang-luc', name: 'Nước Tăng Lực', slug: 'nuoc-tang-luc' },
      { id: 'nuoc-ep-hoa-qua', name: 'Nước Ép Hoa Quả', slug: 'nuoc-ep-hoa-qua' },
    ]
  },
  {
    id: 'mi-thuc-pham-an-lien',
    name: 'Mì - Thực Phẩm Ăn Liền',
    slug: 'mi-thuc-pham-an-lien',
    color: '#f97316',
    imagePrompt: 'A single pack of instant noodles, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic food packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'mi-an-lien', name: 'Mì Ăn Liền', slug: 'mi-an-lien' },
      { id: 'mi-y', name: 'Mì Ý', slug: 'mi-y' },
      { id: 'pho-mien', name: 'Phở - Miến', slug: 'pho-mien' },
      { id: 'thuc-pham-dong-goi', name: 'Thực Phẩm Đóng Gói', slug: 'thuc-pham-dong-goi' },
    ]
  },
  {
    id: 'thuc-pham-kho',
    name: 'Thực Phẩm Khô',
    slug: 'thuc-pham-kho',
    color: '#a16207',
    imagePrompt: 'A single bag of rice, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic food packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'gao', name: 'Gạo', slug: 'gao' },
      { id: 'bot', name: 'Bột', slug: 'bot' },
      { id: 'duong', name: 'Đường', slug: 'duong' },
      { id: 'muoi', name: 'Muối', slug: 'muoi' },
      { id: 'hat-dau-hat', name: 'Hạt - Đậu Hạt', slug: 'hat-dau-hat' },
    ]
  },
  {
    id: 'thuc-pham-che-bien',
    name: 'Thực Phẩm Chế Biến',
    slug: 'thuc-pham-che-bien',
    color: '#dc2626',
    imagePrompt: 'A single package of processed sausage or frozen food, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic food packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'cha-gio-nem', name: 'Chả Giò - Nem', slug: 'cha-gio-nem' },
      { id: 'cha-lua-xuc-xich', name: 'Chả Lụa - Xúc Xích', slug: 'cha-lua-xuc-xich' },
      { id: 'thit-dong-lanh', name: 'Thịt Đông Lạnh', slug: 'thit-dong-lanh' },
      { id: 'ca-dong-lanh', name: 'Cá Đông Lạnh', slug: 'ca-dong-lanh' },
    ]
  },
  {
    id: 'gia-vi',
    name: 'Gia vị',
    slug: 'gia-vi',
    color: '#ca8a04',
    imagePrompt: 'A single bottle of cooking oil or fish sauce, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic condiment packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'dau-an', name: 'Dầu Ăn', slug: 'dau-an' },
      { id: 'nuoc-mam-tuong', name: 'Nước Mắm - Tương', slug: 'nuoc-mam-tuong' },
      { id: 'bot-nem', name: 'Bột Nêm', slug: 'bot-nem' },
      { id: 'gia-vi-khac', name: 'Gia Vị Khác', slug: 'gia-vi-khac' },
    ]
  },
  {
    id: 'trung-dau-hat',
    name: 'Trứng - Dầu Hạt',
    slug: 'trung-dau-hat',
    color: '#eab308',
    imagePrompt: 'A single carton of eggs with white eggs visible, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'trung-ga', name: 'Trứng Gà', slug: 'trung-ga' },
      { id: 'trung-vit', name: 'Trứng Vịt', slug: 'trung-vit' },
      { id: 'trung-cut', name: 'Trứng Cút', slug: 'trung-cut' },
      { id: 'dau-an-2', name: 'Dầu Ăn', slug: 'dau-an-2' },
    ]
  },
  {
    id: 'cham-soc-be',
    name: 'Chăm Sóc Bé',
    slug: 'cham-soc-be',
    color: '#f472b6',
    imagePrompt: 'A single pack of baby diapers, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic baby product packaging, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'ta-bim', name: 'Tã - Bỉm', slug: 'ta-bim' },
      { id: 'sua-bot-tre-em', name: 'Sữa Bột Trẻ Em', slug: 'sua-bot-tre-em' },
      { id: 'do-dung-cho-be', name: 'Đồ Dùng Cho Bé', slug: 'do-dung-cho-be' },
      { id: 'do-choi-tre-em', name: 'Đồ Chơi Trẻ Em', slug: 'do-choi-tre-em' },
    ]
  },
  {
    id: 'do-dung-gia-dinh',
    name: 'Đồ Dùng Gia Đình',
    slug: 'do-dung-gia-dinh',
    color: '#6366f1',
    imagePrompt: 'A single household item like spatula or kitchen tool, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic product, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'dung-cu-bep', name: 'Dụng Cụ Bếp', slug: 'dung-cu-bep' },
      { id: 'do-dung-nha-tam', name: 'Đồ Dùng Nhà Tắm', slug: 'do-dung-nha-tam' },
      { id: 'do-noi-that', name: 'Đồ Nội Thất', slug: 'do-noi-that' },
    ]
  },
  {
    id: 'dien-gia-dung',
    name: 'Điện Gia Dụng',
    slug: 'dien-gia-dung',
    color: '#3b82f6',
    imagePrompt: 'A single small kitchen appliance like blender or rice cooker, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic electronics, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'may-lam-dep', name: 'Máy Làm Đẹp', slug: 'may-lam-dep' },
      { id: 'may-ep-xay', name: 'Máy Ép - Xay', slug: 'may-ep-xay' },
      { id: 'noi-chao', name: 'Nồi - Chảo', slug: 'noi-chao' },
    ]
  },
  {
    id: 'van-phong-pham-do-choi',
    name: 'Văn Phòng Phẩm - Đồ Chơi',
    slug: 'van-phong-pham-do-choi',
    color: '#8b5cf6',
    imagePrompt: 'A single school supply item like notebook or pen, centered composition, clean white background, modern WinMart-style mega menu image, soft studio lighting, realistic stationery, minimalist retail design, professional product photography, no text, no people, no hands, no props, high resolution, sharp focus, perfect for ecommerce category menu display',
    subCategories: [
      { id: 'but-viet', name: 'Bút Viết', slug: 'but-viet' },
      { id: 'vo-tap', name: 'Vở - Tập', slug: 'vo-tap' },
      { id: 'do-choi', name: 'Đồ Chơi', slug: 'do-choi' },
    ]
  },
]
