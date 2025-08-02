import { useCallback, useEffect, useState } from 'react'
import { ImBin, ImFileExcel } from 'react-icons/im'
import { FaRegEdit } from 'react-icons/fa'
import { apiDeleteTB, apiExportExcel, apiGetTB } from '../../apis'
import moment from 'moment'
import Swal from 'sweetalert2'
import {
  Button,
  FilterTime,
  InputForm,
  ModalCreateTB,
  ModalEditTB,
  Pagination,
} from '../../components'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/loading/loadingSlice'
import { toast } from 'react-toastify'
import UseDebouce from '../../hooks/useDebouce'
import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate, useLocation, createSearchParams } from 'react-router-dom'

const ManageThietBi = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()

  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()

  const [thietbis, setThietbis] = useState(null)
  const [counts, setCounts] = useState(0)
  const [begind, setBegind] = useState(null)
  const [endd, setEndd] = useState(null)

  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)
  const render = useCallback(() => setUpdate(!update), [update])

  const queriesDebounce = UseDebouce(watch('q'), 800)
  const page = +params.get('page') || 1
  const limit = +import.meta.env.VITE_LIMIT || 10

  useEffect(() => {
    const queryObj = {}
    if (queriesDebounce) queryObj.q = queriesDebounce
    if (page) queryObj.page = page

    navigate({
      pathname: location.pathname,
      search: createSearchParams(queryObj).toString(),
    })
  }, [queriesDebounce])

  const fetchAllThietBi = async () => {
    const query = {
      begind,
      endd,
      page,
      limit,
      keyword: params.get('q'),
    }

    const res = await apiGetTB(query)

    if (res?.status && Array.isArray(res.data)) {
      setThietbis(res.data)
      setCounts(res.totalItems)
    } else {
      setThietbis([])
      setCounts(0)
    }
  }

  useEffect(() => {
    fetchAllThietBi()
  }, [params, update, begind, endd])

  const handleCreateTB = () => {
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <ModalCreateTB render={render} />,
      })
    )
  }

  const handleEditTB = (el) => {
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <ModalEditTB render={render} editNhanVien={el} />,
      })
    )
  }

  const handleDeleteTB = (id) => {
    Swal.fire({
      text: 'Bạn có muốn xóa Thiết bị này không ?',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const responseDelete = await apiDeleteTB(id)
        if (responseDelete.status) {
          toast.success(responseDelete.message)
        } else {
          toast.error(responseDelete.message)
        }
        render()
      }
    })
  }

  const handleExportExcel = async () => {
    try {
      const response = await apiExportExcel(begind, endd)
      if (!response || !response.data) throw new Error('Không nhận được dữ liệu')

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      let fileName = 'Thietbi.xlsx'
      if (response.headers && response.headers['content-disposition']) {
        const match = response.headers['content-disposition'].match(/filename="?(.+?)"?$/)
        if (match && match[1]) fileName = decodeURIComponent(match[1])
      }

      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Lỗi Xuất Excel:', error)
      toast.error('Không xuất được file!')
    }
  }

  const handleTG = (begindValue, enddValue) => {
    setBegind(begindValue)
    setEndd(enddValue)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <Button handleOnclick={handleCreateTB}> Thêm thiết bị</Button>
        <FilterTime callBackHandle={handleTG} />
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 flex items-center gap-1 text-[14px] text-white font-semibold transition duration-200 bg-green-800 rounded hover:bg-green-900"
        >
          <ImFileExcel />
          <span> Xuất Excel</span>
        </button>
      </div>

      <div className="flex justify-end py-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWith
            placeholder="Tìm kiếm thiết bị..."
          />
        </form>
      </div>

      <table className="w-full mt-4 overflow-hidden text-left border-collapse rounded-lg shadow-md">
        <thead className="text-sm text-white uppercase bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-center">STT</th>
            <th className="px-4 py-2 ">Tên thiết bị</th>
            <th className="px-4 py-2 ">SerialNumber</th>
            <th className="px-4 py-2 ">ServiceTag</th>
            <th className="px-4 py-2 ">Loại thiết bị</th>
            <th className="px-4 py-2 ">Đơn vị sử dụng</th>
            <th className="px-4 py-2 ">Người quản lý</th>
            <th className="px-4 py-2 ">Ngày nhập</th>
            <th className="px-4 py-2 ">Trạng thái</th>
            <th className="px-4 py-2 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {Array.isArray(thietbis) && thietbis.length > 0 ? (
            thietbis.map((el, index) => (
              <tr key={el.id} className="transition hover:bg-gray-100">
                <td className="px-4 py-3 text-center">{(page - 1) * limit + index + 1}</td>
                <td className="px-4 py-3 w-[200px]">{el?.tenThietBi}</td>
                <td className="px-4 py-3 w-[200px]">{el?.serialNumber}</td>
                <td className="px-4 py-3 w-[200px]">{el?.serviceTag}</td>
                <td className="px-4 py-3 w-[200px]">{el?.loaiThietBi}</td>
                <td className="px-4 py-3 w-[200px]">{el?.donViSuDung}</td>
                <td className="px-4 py-3 w-[200px]">{el?.nguoiQuanLy}</td>
                <td className="px-4 py-3 w-[200px]">
                  {el?.ngayNhap ? moment(el.ngayNhap).format('DD/MM/YYYY') : ''}
                </td>
                <td className="px-4 py-3 w-[200px]">{el?.trangThai}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      onClick={() => handleEditTB(el)}
                      className="text-blue-500 cursor-pointer hover:underline hover:text-blue-900"
                    >
                      <FaRegEdit size={20} />
                    </span>
                    <span
                      onClick={() => handleDeleteTB(el.id)}
                      className="text-red-500 cursor-pointer hover:underline hover:text-red-900"
                    >
                      <ImBin size={20} />
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="px-4 py-6 italic text-center text-gray-500">
                Không tìm thấy thiết bị nào phù hợp với tiêu chí lọc.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="w-full mt-3">
        <Pagination totalCount={counts} />
      </div>
    </div>
  )
}

export default ManageThietBi
