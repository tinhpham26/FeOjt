export interface Ward {
  id: string
  name: string
  code: string
}

export interface District {
  id: string
  name: string
  code: string
  wards: Ward[]
}

export interface City {
  id: string
  name: string
  code: string
  districts: District[]
}

export const VIETNAM_LOCATIONS: City[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    code: 'HN',
    districts: [
      { id: 'ba-dinh', name: 'Ba Đình', code: 'BD', wards: [
        { id: 'cong-vi', name: 'Cống Vị', code: 'CV' },
        { id: 'dien-bien', name: 'Điện Biên', code: 'DB' },
        { id: 'doi-can', name: 'Đội Cấn', code: 'DC' },
        { id: 'giang-vo', name: 'Giảng Võ', code: 'GV' },
        { id: 'kim-ma', name: 'Kim Mã', code: 'KM' },
      ]},
      { id: 'hoan-kiem', name: 'Hoàn Kiếm', code: 'HK', wards: [
        { id: 'cua-dong', name: 'Cửa Đông', code: 'CD' },
        { id: 'hang-bac', name: 'Hàng Bạc', code: 'HB' },
        { id: 'hang-bo', name: 'Hàng Bồ', code: 'HBO' },
      ]},
      { id: 'dong-da', name: 'Đống Đa', code: 'DD', wards: [
        { id: 'cat-linh', name: 'Cát Linh', code: 'CL' },
        { id: 'hang-bot', name: 'Hàng Bột', code: 'HBT' },
        { id: 'khuat-duy-tien', name: 'Khuất Duy Tiến', code: 'KDT' },
      ]},
      { id: 'hai-ba-trung', name: 'Hai Bà Trưng', code: 'HBT', wards: [
        { id: 'bach-dang', name: 'Bạch Đằng', code: 'BD' },
        { id: 'dong-nhan', name: 'Đồng Nhân', code: 'DN' },
      ]},
      { id: 'cau-giay', name: 'Cầu Giấy', code: 'CG', wards: [
        { id: 'dich-vong', name: 'Dịch Vọng', code: 'DV' },
        { id: 'mai-dich', name: 'Mai Dịch', code: 'MD' },
      ]},
    ]
  },
  {
    id: 'hochiminh',
    name: 'Hồ Chí Minh',
    code: 'HCM',
    districts: [
      { id: 'quan1', name: 'Quận 1', code: 'Q1', wards: [
        { id: 'ben-nghe', name: 'Bến Nghé', code: 'BN' },
        { id: 'ben-thanh', name: 'Bến Thành', code: 'BT' },
        { id: 'nguyen-cu-trinh', name: 'Nguyễn Cư Trinh', code: 'NCT' },
        { id: 'nguyen-thai-binh', name: 'Nguyễn Thái Bình', code: 'NTB' },
      ]},
      { id: 'quan2', name: 'Quận 2', code: 'Q2', wards: [
        { id: 'an-phu', name: 'An Phú', code: 'AP' },
        { id: 'an-khanh', name: 'An Khánh', code: 'AK' },
        { id: 'thao-dien', name: 'Thảo Điền', code: 'TD' },
      ]},
      { id: 'quan3', name: 'Quận 3', code: 'Q3', wards: [
        { id: 'phuong1', name: 'Phường 1', code: 'P1' },
        { id: 'phuong2', name: 'Phường 2', code: 'P2' },
      ]},
      { id: 'binh-thanh', name: 'Bình Thạnh', code: 'BT', wards: [
        { id: 'phuong1', name: 'Phường 1', code: 'P1' },
        { id: 'phuong2', name: 'Phường 2', code: 'P2' },
      ]},
      { id: 'thu-duc', name: 'Thủ Đức', code: 'TD', wards: [
        { id: 'linh-chieu', name: 'Linh Chiểu', code: 'LC' },
        { id: 'tam-phu', name: 'Tam Phú', code: 'TP' },
      ]},
    ]
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    code: 'DN',
    districts: [
      { id: 'hai-chau', name: 'Hải Châu', code: 'HC', wards: [
        { id: 'hai-chau-1', name: 'Hải Châu 1', code: 'HC1' },
        { id: 'hai-chau-2', name: 'Hải Châu 2', code: 'HC2' },
        { id: 'binh-hien', name: 'Bình Hiên', code: 'BH' },
      ]},
      { id: 'thanh-khe', name: 'Thanh Khê', code: 'TK', wards: [
        { id: 'tam-thuan', name: 'Tam Thuận', code: 'TT' },
        { id: 'thanh-khe-dong', name: 'Thanh Khê Đông', code: 'TKD' },
      ]},
      { id: 'son-tra', name: 'Sơn Trà', code: 'ST', wards: [
        { id: 'man-thai', name: 'Mân Thái', code: 'MT' },
        { id: 'phuoc-my', name: 'Phước Mỹ', code: 'PM' },
      ]},
    ]
  },
  {
    id: 'haiphong',
    name: 'Hải Phòng',
    code: 'HP',
    districts: [
      { id: 'hong-bang', name: 'Hồng Bàng', code: 'HB', wards: [
        { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', code: 'HVT' },
        { id: 'so-dau', name: 'Sở Dầu', code: 'SD' },
      ]},
      { id: 'ngo-quyen', name: 'Ngô Quyền', code: 'NQ', wards: [
        { id: 'may-to', name: 'Máy Tơ', code: 'MT' },
        { id: 'cau-dat', name: 'Cầu Đất', code: 'CD' },
      ]},
    ]
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    code: 'CT',
    districts: [
      { id: 'ninh-kieu', name: 'Ninh Kiều', code: 'NK', wards: [
        { id: 'an-hoa', name: 'An Hòa', code: 'AH' },
        { id: 'an-lac', name: 'An Lạc', code: 'AL' },
      ]},
      { id: 'cai-rang', name: 'Cái Răng', code: 'CR', wards: [
        { id: 'hung-phu', name: 'Hưng Phú', code: 'HP' },
        { id: 'le-binh', name: 'Lê Bình', code: 'LB' },
      ]},
    ]
  },
  { id: 'angiang', name: 'An Giang', code: 'AG', districts: [
    { id: 'long-xuyen', name: 'Long Xuyên', code: 'LX', wards: [{ id: 'my-binh', name: 'Mỹ Bình', code: 'MB' }]},
    { id: 'chau-doc', name: 'Châu Đốc', code: 'CD', wards: [{ id: 'chau-phu-a', name: 'Châu Phú A', code: 'CPA' }]},
  ]},
  { id: 'baria-vungtau', name: 'Bà Rịa - Vũng Tàu', code: 'BRVT', districts: [
    { id: 'vung-tau', name: 'Vũng Tàu', code: 'VT', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
    { id: 'ba-ria', name: 'Bà Rịa', code: 'BR', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'bacgiang', name: 'Bắc Giang', code: 'BG', districts: [
    { id: 'thanh-pho-bac-giang', name: 'TP. Bắc Giang', code: 'BG', wards: [{ id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', code: 'HVT' }]},
  ]},
  { id: 'backan', name: 'Bắc Kạn', code: 'BK', districts: [
    { id: 'thanh-pho-bac-kan', name: 'TP. Bắc Kạn', code: 'BK', wards: [{ id: 'duc-xuong', name: 'Đức Xuân', code: 'DX' }]},
  ]},
  { id: 'baclieu', name: 'Bạc Liêu', code: 'BL', districts: [
    { id: 'thanh-pho-bac-lieu', name: 'TP. Bạc Liêu', code: 'BL', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'bacninh', name: 'Bắc Ninh', code: 'BN', districts: [
    { id: 'thanh-pho-bac-ninh', name: 'TP. Bắc Ninh', code: 'BN', wards: [{ id: 'vo-cuong', name: 'Vô Cương', code: 'VC' }]},
    { id: 'tu-son', name: 'Từ Sơn', code: 'TS', wards: [{ id: 'dong-nguyen', name: 'Đông Nguyên', code: 'DN' }]},
  ]},
  { id: 'bentre', name: 'Bến Tre', code: 'BT', districts: [
    { id: 'thanh-pho-ben-tre', name: 'TP. Bến Tre', code: 'BT', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'binhdinh', name: 'Bình Định', code: 'BD', districts: [
    { id: 'quy-nhon', name: 'Quy Nhơn', code: 'QN', wards: [{ id: 'le-loi', name: 'Lê Lợi', code: 'LL' }]},
  ]},
  { id: 'binhduong', name: 'Bình Dương', code: 'BD', districts: [
    { id: 'thu-dau-mot', name: 'Thủ Dầu Một', code: 'TDM', wards: [{ id: 'phu-hoa', name: 'Phú Hòa', code: 'PH' }]},
    { id: 'di-an', name: 'Dĩ An', code: 'DA', wards: [{ id: 'di-an', name: 'Dĩ An', code: 'DA' }]},
  ]},
  { id: 'binhphuoc', name: 'Bình Phước', code: 'BP', districts: [
    { id: 'dong-xoai', name: 'Đồng Xoài', code: 'DX', wards: [{ id: 'tan-xuan', name: 'Tân Xuân', code: 'TX' }]},
  ]},
  { id: 'binhthuan', name: 'Bình Thuận', code: 'BTH', districts: [
    { id: 'phan-thiet', name: 'Phan Thiết', code: 'PT', wards: [{ id: 'phu-hai', name: 'Phú Hải', code: 'PH' }]},
  ]},
  { id: 'camau', name: 'Cà Mau', code: 'CM', districts: [
    { id: 'thanh-pho-ca-mau', name: 'TP. Cà Mau', code: 'CM', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'caobang', name: 'Cao Bằng', code: 'CB', districts: [
    { id: 'thanh-pho-cao-bang', name: 'TP. Cao Bằng', code: 'CB', wards: [{ id: 'hop-giang', name: 'Hợp Giang', code: 'HG' }]},
  ]},
  { id: 'daklak', name: 'Đắk Lắk', code: 'DL', districts: [
    { id: 'buon-ma-thuot', name: 'Buôn Ma Thuột', code: 'BMT', wards: [{ id: 'tan-an', name: 'Tân An', code: 'TA' }]},
  ]},
  { id: 'daknong', name: 'Đắk Nông', code: 'DN', districts: [
    { id: 'gia-nghia', name: 'Gia Nghĩa', code: 'GN', wards: [{ id: 'nghia-tan', name: 'Nghĩa Tân', code: 'NT' }]},
  ]},
  { id: 'dienbien', name: 'Điện Biên', code: 'DB', districts: [
    { id: 'dien-bien-phu', name: 'Điện Biên Phủ', code: 'DBP', wards: [{ id: 'him-lam', name: 'Him Lam', code: 'HL' }]},
  ]},
  { id: 'dongnai', name: 'Đồng Nai', code: 'DN', districts: [
    { id: 'bien-hoa', name: 'Biên Hòa', code: 'BH', wards: [{ id: 'quyet-thang', name: 'Quyết Thắng', code: 'QT' }]},
    { id: 'long-thanh', name: 'Long Thành', code: 'LT', wards: [{ id: 'an-phuoc', name: 'An Phước', code: 'AP' }]},
  ]},
  { id: 'dongthap', name: 'Đồng Tháp', code: 'DT', districts: [
    { id: 'cao-lanh', name: 'Cao Lãnh', code: 'CL', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'gialai', name: 'Gia Lai', code: 'GL', districts: [
    { id: 'pleiku', name: 'Pleiku', code: 'PK', wards: [{ id: 'chi-lang', name: 'Chí Lăng', code: 'CL' }]},
  ]},
  { id: 'hagiang', name: 'Hà Giang', code: 'HG', districts: [
    { id: 'thanh-pho-ha-giang', name: 'TP. Hà Giang', code: 'HG', wards: [{ id: 'nguyen-trai', name: 'Nguyễn Trãi', code: 'NT' }]},
  ]},
  { id: 'hanam', name: 'Hà Nam', code: 'HNM', districts: [
    { id: 'phu-ly', name: 'Phủ Lý', code: 'PL', wards: [{ id: 'quang-trung', name: 'Quang Trung', code: 'QT' }]},
  ]},
  { id: 'hatinh', name: 'Hà Tĩnh', code: 'HT', districts: [
    { id: 'ha-tinh', name: 'Hà Tĩnh', code: 'HT', wards: [{ id: 'bac-ha', name: 'Bắc Hà', code: 'BH' }]},
  ]},
  { id: 'haiduong', name: 'Hải Dương', code: 'HD', districts: [
    { id: 'thanh-pho-hai-duong', name: 'TP. Hải Dương', code: 'HD', wards: [{ id: 'cau-sen', name: 'Cẩm Sen', code: 'CS' }]},
  ]},
  { id: 'haugiang', name: 'Hậu Giang', code: 'HG', districts: [
    { id: 'vi-thanh', name: 'Vị Thanh', code: 'VT', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'hoabinh', name: 'Hòa Bình', code: 'HB', districts: [
    { id: 'thanh-pho-hoa-binh', name: 'TP. Hòa Bình', code: 'HB', wards: [{ id: 'tan-thinh', name: 'Tân Thịnh', code: 'TT' }]},
  ]},
  { id: 'hungyen', name: 'Hưng Yên', code: 'HY', districts: [
    { id: 'hung-yen', name: 'Hưng Yên', code: 'HY', wards: [{ id: 'le-loi', name: 'Lê Lợi', code: 'LL' }]},
  ]},
  { id: 'khanhhoa', name: 'Khánh Hòa', code: 'KH', districts: [
    { id: 'nha-trang', name: 'Nha Trang', code: 'NT', wards: [{ id: 'loc-tho', name: 'Lộc Thọ', code: 'LT' }]},
  ]},
  { id: 'kiengiang', name: 'Kiên Giang', code: 'KG', districts: [
    { id: 'rach-gia', name: 'Rạch Giá', code: 'RG', wards: [{ id: 'vinh-thanh', name: 'Vĩnh Thanh', code: 'VT' }]},
    { id: 'phu-quoc', name: 'Phú Quốc', code: 'PQ', wards: [{ id: 'duong-dong', name: 'Dương Đông', code: 'DD' }]},
  ]},
  { id: 'kontum', name: 'Kon Tum', code: 'KT', districts: [
    { id: 'kontum', name: 'Kon Tum', code: 'KT', wards: [{ id: 'thong-nhat', name: 'Thống Nhất', code: 'TN' }]},
  ]},
  { id: 'laichau', name: 'Lai Châu', code: 'LC', districts: [
    { id: 'lai-chau', name: 'Lai Châu', code: 'LC', wards: [{ id: 'dong-phuc', name: 'Đông Phục', code: 'DP' }]},
  ]},
  { id: 'lamdong', name: 'Lâm Đồng', code: 'LD', districts: [
    { id: 'da-lat', name: 'Đà Lạt', code: 'DL', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
    { id: 'bao-loc', name: 'Bảo Lộc', code: 'BL', wards: [{ id: 'loc-phat', name: 'Lộc Phát', code: 'LP' }]},
  ]},
  { id: 'langson', name: 'Lạng Sơn', code: 'LS', districts: [
    { id: 'lang-son', name: 'Lạng Sơn', code: 'LS', wards: [{ id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', code: 'HVT' }]},
  ]},
  { id: 'laocai', name: 'Lào Cai', code: 'LC', districts: [
    { id: 'lao-cai', name: 'Lào Cai', code: 'LC', wards: [{ id: 'kim-tan', name: 'Kim Tân', code: 'KT' }]},
    { id: 'sa-pa', name: 'Sa Pa', code: 'SP', wards: [{ id: 'sa-pa', name: 'Sa Pa', code: 'SP' }]},
  ]},
  { id: 'longan', name: 'Long An', code: 'LA', districts: [
    { id: 'tan-an', name: 'Tân An', code: 'TA', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'namdinh', name: 'Nam Định', code: 'ND', districts: [
    { id: 'nam-dinh', name: 'Nam Định', code: 'ND', wards: [{ id: 'phu-minh', name: 'Phú Minh', code: 'PM' }]},
  ]},
  { id: 'ngheann', name: 'Nghệ An', code: 'NA', districts: [
    { id: 'vinh', name: 'Vinh', code: 'V', wards: [{ id: 'ben-thuy', name: 'Bến Thủy', code: 'BT' }]},
    { id: 'cua-lo', name: 'Cửa Lò', code: 'CL', wards: [{ id: 'nghi-hoa', name: 'Nghi Hòa', code: 'NH' }]},
  ]},
  { id: 'ninhbinh', name: 'Ninh Bình', code: 'NB', districts: [
    { id: 'ninh-binh', name: 'Ninh Bình', code: 'NB', wards: [{ id: 'dong-thanh', name: 'Đông Thành', code: 'DT' }]},
  ]},
  { id: 'ninhthuan', name: 'Ninh Thuận', code: 'NT', districts: [
    { id: 'phan-rang-thap-cham', name: 'Phan Rang-Tháp Chàm', code: 'PR', wards: [{ id: 'phuoc-my', name: 'Phước Mỹ', code: 'PM' }]},
  ]},
  { id: 'phutho', name: 'Phú Thọ', code: 'PT', districts: [
    { id: 'viet-tri', name: 'Việt Trì', code: 'VT', wards: [{ id: 'tien-cat', name: 'Tiên Cát', code: 'TC' }]},
  ]},
  { id: 'phuyen', name: 'Phú Yên', code: 'PY', districts: [
    { id: 'tuy-hoa', name: 'Tuy Hòa', code: 'TH', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'quangbinh', name: 'Quảng Bình', code: 'QB', districts: [
    { id: 'dong-hoi', name: 'Đồng Hới', code: 'DH', wards: [{ id: 'dong-my', name: 'Đồng Mỹ', code: 'DM' }]},
  ]},
  { id: 'quangnam', name: 'Quảng Nam', code: 'QN', districts: [
    { id: 'tam-ky', name: 'Tam Kỳ', code: 'TK', wards: [{ id: 'an-my', name: 'An Mỹ', code: 'AM' }]},
    { id: 'hoi-an', name: 'Hội An', code: 'HA', wards: [{ id: 'minh-an', name: 'Minh An', code: 'MA' }]},
  ]},
  { id: 'quangngai', name: 'Quảng Ngãi', code: 'QNG', districts: [
    { id: 'quang-ngai', name: 'Quảng Ngãi', code: 'QN', wards: [{ id: 'le-hong-phong', name: 'Lê Hồng Phong', code: 'LHP' }]},
  ]},
  { id: 'quangninh', name: 'Quảng Ninh', code: 'QNH', districts: [
    { id: 'ha-long', name: 'Hạ Long', code: 'HL', wards: [{ id: 'bai-chay', name: 'Bãi Cháy', code: 'BC' }]},
    { id: 'cam-pha', name: 'Cẩm Phả', code: 'CP', wards: [{ id: 'mong-duong', name: 'Mông Dương', code: 'MD' }]},
  ]},
  { id: 'quangtri', name: 'Quảng Trị', code: 'QT', districts: [
    { id: 'dong-ha', name: 'Đông Hà', code: 'DH', wards: [{ id: 'dong-giang', name: 'Đông Giang', code: 'DG' }]},
  ]},
  { id: 'soctrang', name: 'Sóc Trăng', code: 'ST', districts: [
    { id: 'soc-trang', name: 'Sóc Trăng', code: 'ST', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'sonla', name: 'Sơn La', code: 'SL', districts: [
    { id: 'son-la', name: 'Sơn La', code: 'SL', wards: [{ id: 'quynh-nhai', name: 'Quynh Nhai', code: 'QN' }]},
  ]},
  { id: 'tayninh', name: 'Tây Ninh', code: 'TN', districts: [
    { id: 'tay-ninh', name: 'Tây Ninh', code: 'TN', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'thaibinh', name: 'Thái Bình', code: 'TB', districts: [
    { id: 'thai-binh', name: 'Thái Bình', code: 'TB', wards: [{ id: 'tran-hung-dao', name: 'Trần Hưng Đạo', code: 'THD' }]},
  ]},
  { id: 'thainguyen', name: 'Thái Nguyên', code: 'TN', districts: [
    { id: 'thai-nguyen', name: 'Thái Nguyên', code: 'TN', wards: [{ id: 'quang-trung', name: 'Quang Trung', code: 'QT' }]},
  ]},
  { id: 'thanhhoa', name: 'Thanh Hóa', code: 'TH', districts: [
    { id: 'thanh-hoa', name: 'Thanh Hóa', code: 'TH', wards: [{ id: 'lam-son', name: 'Lam Sơn', code: 'LS' }]},
  ]},
  { id: 'thuathienhue', name: 'Thừa Thiên Huế', code: 'TTH', districts: [
    { id: 'hue', name: 'Huế', code: 'H', wards: [{ id: 'phu-hoi', name: 'Phú Hội', code: 'PH' }]},
  ]},
  { id: 'tiengiang', name: 'Tiền Giang', code: 'TG', districts: [
    { id: 'my-tho', name: 'Mỹ Tho', code: 'MT', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'travinh', name: 'Trà Vinh', code: 'TV', districts: [
    { id: 'tra-vinh', name: 'Trà Vinh', code: 'TV', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'tuyenquang', name: 'Tuyên Quang', code: 'TQ', districts: [
    { id: 'tuyen-quang', name: 'Tuyên Quang', code: 'TQ', wards: [{ id: 'an-tuong', name: 'An Tường', code: 'AT' }]},
  ]},
  { id: 'vinhlong', name: 'Vĩnh Long', code: 'VL', districts: [
    { id: 'vinh-long', name: 'Vĩnh Long', code: 'VL', wards: [{ id: 'phuong1', name: 'Phường 1', code: 'P1' }]},
  ]},
  { id: 'vinhphuc', name: 'Vĩnh Phúc', code: 'VP', districts: [
    { id: 'vinh-yen', name: 'Vĩnh Yên', code: 'VY', wards: [{ id: 'lien-bao', name: 'Liên Bảo', code: 'LB' }]},
  ]},
  { id: 'yenbai', name: 'Yên Bái', code: 'YB', districts: [
    { id: 'yen-bai', name: 'Yên Bái', code: 'YB', wards: [{ id: 'yen-ninh', name: 'Yên Ninh', code: 'YN' }]},
  ]},
]

// Helper functions
export function getDistrictsByCity(cityId: string): District[] {
  const city = VIETNAM_LOCATIONS.find(c => c.id === cityId)
  return city?.districts || []
}

export function getWardsByDistrict(cityId: string, districtId: string): Ward[] {
  const city = VIETNAM_LOCATIONS.find(c => c.id === cityId)
  const district = city?.districts.find(d => d.id === districtId)
  return district?.wards || []
}

export function getCityById(cityId: string): City | undefined {
  return VIETNAM_LOCATIONS.find(c => c.id === cityId)
}

export function getDistrictById(cityId: string, districtId: string): District | undefined {
  const city = getCityById(cityId)
  return city?.districts.find(d => d.id === districtId)
}

export function getWardById(cityId: string, districtId: string, wardId: string): Ward | undefined {
  const district = getDistrictById(cityId, districtId)
  return district?.wards.find(w => w.id === wardId)
}
