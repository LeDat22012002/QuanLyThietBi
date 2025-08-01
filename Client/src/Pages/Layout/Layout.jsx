import { Outlet } from 'react-router-dom'
import { Sidebar, Header } from '../../components'
import { useState } from 'react'
import clsx from 'clsx'
// import path from '../../ultils/path';
// import { useSelector } from 'react-redux';
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentNav, setCurrentNav] = useState('')
  // const { current, isLoggedIn } = useSelector((state) => state.user);
  // console.log('test', current);
  // if (!current && !isLoggedIn) {
  //   return <Navigate to={`/`} replace />;
  // }
  return (
    <div className="flex w-full h-screen text-gray-900">
      {/* === SIDEBAR === */}
      <div
        className={clsx(
          'fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-gray-200 transition-all duration-300',
          isSidebarOpen ? 'w-[260px]' : 'w-[60px]'
        )}
      >
        <Sidebar
          isMini={!isSidebarOpen}
          onExpand={() => setIsSidebarOpen(true)}
          currentNav={currentNav}
        />
      </div>

      {/* === PHẦN NỘI DUNG BÊN PHẢI SIDEBAR === */}
      <div
        className={clsx(
          'flex flex-col transition-all duration-300 h-full w-full',
          isSidebarOpen ? 'ml-[260px]' : 'ml-[60px]'
        )}
      >
        {/* === HEADER CỐ ĐỊNH === */}
        <div
          className="fixed top-0 right-0 z-40 h-[50px] flex items-center px-4 shadow transition-all duration-300"
          style={{
            left: isSidebarOpen ? '260px' : '60px',
            width: `calc(100% - ${isSidebarOpen ? '260px' : '60px'})`,
          }}
        >
          <Header
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            setCurrentNav={setCurrentNav}
          />
        </div>

        {/* === SPACER ĐẨY OUTLET XUỐNG DƯỚI HEADER === */}
        <div className="h-[50px]" />

        {/* === OUTLET CUỘN NẾU DÀI === */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
