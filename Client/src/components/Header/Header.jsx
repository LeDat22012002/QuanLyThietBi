import icons from '../../ultils/icons'
import avatar from '../../assets/image/account.png'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
// import { apiLogout } from '../../apis/user';
// import { toast } from 'react-toastify'
import path from '../../ultils/path'
import { FaMessage } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa'
import { IoIosSunny } from 'react-icons/io'
// import { navigation } from '../../ultils/contain'
// import { clsx } from 'clsx'
// import { useDispatch, useSelector } from 'react-redux'
// import { setCurrentNav } from '../../store/currentNav/navSlice'

// import { getCurent } from '../../store/user/asyncActions'

const { IoMdMenu, FaSortDown } = icons
const Header = ({ onToggleSidebar }) => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  const [isShowOption, setIsShowOption] = useState(false)
  // const { current, isLoggedIn } = useSelector((state) => state.user)
  // console.log('daaa', current);
  // const { currentNav } = useSelector((state) => state.nav)
  // const handleLogout = async () => {
  //   dispatch(logout())
  //   navigate(`${path.LOGIN}`)
  //   toast.success('Logout thành công !')
  // }
  // const handleActive = (value) => {
  //   dispatch(setCurrentNav(value))
  // }

  // useEffect(() => {
  //   const setTimeoutId = setTimeout(() => {
  //     if (isLoggedIn) {
  //       dispatch(getCurent())
  //     }
  //   }, 100)
  //   return () => {
  //     clearTimeout(setTimeoutId)
  //   }
  // }, [dispatch, isLoggedIn])

  // useEffect(() => {
  //   if (mess)
  //     Swal.fire('Oops!', mess, 'info').then(() => {
  //       dispatch(clearMessage());
  //       navigate(`${path.LOGIN}`);
  //     });
  // }, [mess]);

  return (
    <div className="w-full bg-white h-[50px] flex justify-between items-center ">
      <div className="ml-2 cursor-pointer" onClick={onToggleSidebar}>
        <IoMdMenu size={25}></IoMdMenu>
      </div>
      {/* <div className="flex items-center gap-2 px-4 py-2">
        {navigation.map((el) => (
          <button
            key={el.id}
            onClick={() => handleActive(el?.value)}
            className={clsx(
              'flex items-center gap-1 px-3 py-1.5 text-sm border rounded border-blue-600 transition',
              currentNav === el.value ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
            )}
          >
            {el.value}
          </button>
        ))}
      </div> */}

      <div className="flex gap-4 mr-10 ">
        <div className="flex items-center gap-7 ">
          <span>
            <FaMessage color="black" />
          </span>
          <span>
            <FaBell color="black" />
          </span>
          <span>
            <IoIosSunny size={25} color="black" />
          </span>
        </div>
        <div className="flex items-center gap-1 ">
          <div
            id="profile"
            onClick={() => {
              setIsShowOption((prev) => !prev)
            }}
            className="relative items-center justify-center gap-2 px-3 cursor-pointer flex  w-auto h-[50px] rounded-sm shadow-amber-50 "
          >
            <img
              src={avatar}
              alt="avatar"
              className="w-[30px] h-[30px] rounded-full object-cover"
            />

            <span className="hidden text-[14px] sm:block">Tạ Công Vương</span>
            <div className="pb-2">
              <FaSortDown />
            </div>

            {isShowOption && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-50 w-[180px] top-12 right-[-3px] bg-white border border-gray-300 rounded-sm shadow-xl text-sm"
              >
                {/* Mũi nhọn hướng lên */}
                <div className="absolute z-0 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-300 -top-2 right-4"></div>

                <div className="relative z-10">
                  <Link
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-sky-100 rounded-t-md"
                  >
                    Personal
                  </Link>

                  <button
                    // onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
