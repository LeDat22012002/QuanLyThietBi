import { useCallback, useEffect, useState } from 'react'
import { ImBin, ImFileExcel } from 'react-icons/im'
import { FaRegEdit } from 'react-icons/fa'
import { apiDeleteTB, apiExportExcel, apiGetTB } from '../../apis'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Button, FilterTime, ModalCreateTB, ModalEditTB } from '../../components'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/loading/loadingSlice'
import { toast } from 'react-toastify'
const ManageThietBi = () => {
  const [thietbis, setThietbis] = useState(null)
  const [begind, setBegind] = useState(null)
  const [endd, setEndd] = useState(null)
  // const [editNhanVien, setEditNhanVien] = useState(null);
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)
  const render = useCallback(() => {
    setUpdate(!update)
  })
  const fetchAllThietBi = async () => {
    const res = await apiGetTB(begind, endd)
    console.log(res.data)
    if (res.status) {
      setThietbis(res?.data)
    }
  }
  useEffect(() => {
    fetchAllThietBi()
  }, [update])
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
        modalChildren: (
          <ModalEditTB
            render={render}
            editNhanVien={el}
            // setEditNhanVien={setEditNhanVien}
          />
        ),
      })
    )
  }
  const handleDeleteTB = (id) => {
    Swal.fire({
      // title: 'Bạn có chắn chắn ?',
      text: 'Bạn có muốn xóa Thiết bị này không ?',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        // console.log(id);
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
    // if (!begind || !endd) {
    //   toast.warning('Thiếu thời gian!');
    //   return;
    // }

    try {
      const response = await apiExportExcel(begind, endd)

      //  Đảm bảo response và headers tồn tại
      if (!response || !response.data) {
        throw new Error('Không nhận được dữ liệu từ server.')
      }

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      //  Kiểm tra header tồn tại trước khi đọc
      let fileName = 'Thietbi.xlsx'
      if (response.headers && response.headers['content-disposition']) {
        const match = response.headers['content-disposition'].match(/filename="?(.+?)"?$/)
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1])
        }
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
    fetchAllThietBi(begindValue, enddValue)
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <div>
          <Button handleOnclick={handleCreateTB}> Thêm thiết bị</Button>
        </div>
        <div>
          <FilterTime callBackHandle={handleTG} />
        </div>
        <div>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 flex items-center gap-1 text-[14px] text-white font-semibold transition duration-200 bg-green-800 rounded hover:bg-green-900"
          >
            <ImFileExcel />
            <span> Xuất Excel</span>
          </button>
        </div>
      </div>
      <table className="w-full mt-10 overflow-hidden text-left border-collapse rounded-lg shadow-md">
        <thead className="text-sm text-white uppercase bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-center">STT</th>
            <th className="px-4 py-2 ">Tên thiết bị</th>
            <th className="px-4 py-2 ">SerialNumber</th>
            <th className="px-4 py-2 ">ServiceTag</th>
            <th className="px-4 py-2 ">Loại thiết bị</th>
            <th className="px-4 py-2 ">Đơn vị sử dụng </th>
            <th className="px-4 py-2 ">Người quản lý</th>
            <th className="px-4 py-2 ">Ngày nhập</th>
            <th className="px-4 py-2 ">Trạng thái</th>
            <th className="px-4 py-2 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {thietbis?.map((el, index) => (
            <tr key={index} className="transition hover:bg-gray-100">
              <td className="px-4 py-3 text-center ">{index + 1}</td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.tenThietBi}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.serialNumber}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.serviceTag}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.loaiThietBi}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.donViSuDung}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.nguoiQuanLy}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.ngayNhap ? moment(el.ngayNhap).format('DD/MM/YYYY') : ''}</span>
              </td>
              <td className="px-4 py-3 w-[200px]">
                <span>{el?.trangThai}</span>
              </td>

              <td className="px-4 py-3 space-x-2 text-center ">
                <div className="flex items-center justify-center gap-2">
                  <span
                    onClick={() => handleEditTB(el)}
                    className="text-blue-500 cursor-pointer hover:underline hover:text-blue-900"
                  >
                    <FaRegEdit size={20} />
                  </span>

                  <span
                    onClick={() => handleDeleteTB(el?.id)}
                    className="text-red-500 cursor-pointer hover:underline hover:text-red-900 "
                  >
                    <ImBin size={20} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageThietBi
