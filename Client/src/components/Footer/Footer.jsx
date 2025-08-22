import { memo } from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="w-full z-[9999] h-[40px] bg-gray-900 flex justify-between items-center px-4 text-white">
      <div>
        <span className="font-bold">Copyright © Đạt {year}</span>
      </div>
      <div className="font-bold">
        <span>QUẢN LÝ THIẾT BỊ {year}</span>
      </div>
    </div>
  )
}

export default memo(Footer)
