import { useState, useCallback } from 'react'
import { InputField, Button, Footer } from '../../components'
import { apiLogin } from '../../apis/User/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import { validate } from '../../ultils/helpers'
import BgHPDQ from '../../assets/image/Br_HoaPhat.png'
import logo from '../../assets/image/Logo.png'
import { useDispatch } from 'react-redux'
import { login } from '../../store/user/userSlice'
// import { setCurrentNav } from '../../store/currentNav/navSlice'
import { showModal } from '../../store/loading/loadingSlice'

const Login = () => {
  // const [manv, setManv] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    manv: '',
    password: '',
  })
  const [invalidFields, setInvalidFields] = useState([])
  const navigate = useNavigate()
  const handleSubmit = useCallback(async () => {
    const data = { ...payload }
    const invalids = validate(data, setInvalidFields)
    if (invalids === 0) {
      try {
        // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
        const rs = await apiLogin(data) // Nếu bị 401 => văng vào catch luôn
        // dispatch(showModal({ isShowModal: false, modalChildren: null }))

        if (rs.status) {
          const { accessToken, maNv, role, hoTen } = rs.data
          dispatch(
            login({
              isLoggedIn: true,
              token: accessToken,
              userData: { maNv, role, hoTen },
            })
          )
          // await dispatch(getCurent());

          navigate(`/${path.LAYOUT}/${path.MANAGE_TB}`)
          toast.success(rs.message)
        } else {
          toast.error(rs.message || 'Đăng nhập thất bại!')
        }
      } catch (err) {
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        const msg = err?.response?.data?.message || 'Lỗi máy chủ hoặc kết nối thất bại!'
        toast.error(msg)
      }
    }
  }, [payload])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex h-[calc(100vh-50px)]">
        {/* LEFT - FORM LOGIN */}
        <div className="w-[25%] min-w-[320px] flex justify-center flex-col items-center bg-white z-10">
          <div className="mb-[50px]">
            <img src={logo} alt="logo" className="object-cover w-[300px]"></img>
          </div>
          <div className="w-[90%] flex flex-col items-center justify-center mb-4 ">
            <h3 className="text-main text-[28px] font-semibold">PHẦN MỀM QUẢN LÝ DỮ LIỆU</h3>
            <h3 className="text-main text-[28px] font-semibold">NHÀ MÁY NHIỆT ĐIỆN</h3>
          </div>
          <div className="w-[90%] max-w-[500px] bg-white border border-blue-400 rounded-md shadow-lg flex flex-col items-center animate-slide-up">
            <div className="flex items-center justify-center w-full py-[10px] mb-4 bg-gray-200 border border-b-gray-300">
              <h3 className="text-[23px] font-semibold text-main ">ĐĂNG NHẬP</h3>
            </div>
            <div className="flex flex-col w-full p-4">
              <div className="flex flex-col w-full mb-2">
                <span>Mã nhân viên</span>
                <InputField
                  value={payload.manv}
                  nameKey="manv"
                  setValue={setPayload}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  fullWith
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <span>Mật khẩu</span>
                <InputField
                  value={payload.password}
                  setValue={setPayload}
                  nameKey="password"
                  type="password"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  fullWith
                />
              </div>
              <Button handleOnclick={handleSubmit} fw>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT - BACKGROUND IMAGE */}
        <div className="relative flex-1 h-full">
          <img className="object-cover w-full h-full" src={BgHPDQ} alt="bg" />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login
