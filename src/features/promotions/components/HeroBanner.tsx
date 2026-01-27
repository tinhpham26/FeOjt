'use client'

export function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 text-center text-white px-6">
        <h2 className="text-4xl font-bold mb-4">Siêu sale mùa hè</h2>
        <p className="text-xl mb-6">Giảm giá đến 50% cho hàng ngàn sản phẩm</p>
        <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Mua ngay
        </button>
      </div>
    </div>
  )
}
