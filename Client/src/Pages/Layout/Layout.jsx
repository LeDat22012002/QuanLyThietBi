import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar, Header, Footer } from '../../components'
import { useState } from 'react'
import clsx from 'clsx'
// import path from '../../ultils/path';
import { useSelector } from 'react-redux'
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentNav, setCurrentNav] = useState('')
  // const { current, isLoggedIn } = useSelector((state) => state.user)
  // console.log('test', current);
  // if (!current && !isLoggedIn) {
  //   return <Navigate to={`/`} replace />
  // }
  return (
    <div className="flex flex-col min-h-screen">
      {/* MAIN */}
      <div className="flex flex-1 w-full min-h-0 text-gray-900">
        {/* SIDEBAR fixed */}
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

        {/* CONTENT */}
        <div
          className={clsx(
            'flex flex-col flex-1 min-h-0 transition-all duration-300',
            isSidebarOpen ? 'ml-[260px]' : 'ml-[60px]'
          )}
        >
          {/* HEADER fixed */}
          <div
            className="fixed top-0 right-0 z-40 h-[50px] flex items-center px-4 shadow transition-all duration-300 bg-white"
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

          {/* spacer cho header */}
          <div className="h-[50px] flex-none" />

          {/* vùng cuộn */}
          <div className="flex-1 min-h-0 px-4 py-1 overflow-y-auto bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
      {/* FOOTER*/}
      <div className="shrink-0 z-[9999]">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
