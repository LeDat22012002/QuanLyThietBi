import { memo, useEffect } from 'react'
import { apiEditTB } from '../../apis'
import { Button, InputForm } from '../'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/loading/loadingSlice'
import { RxCross2 } from 'react-icons/rx'
const ModalEditTB = ({ render, editNhanVien }) => {
  const dispatch = useDispatch()
  // const [phongbans, setPhongBan] = useState(null);
  //   console.log('dat', editNhanVien);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()

  useEffect(() => {
    if (editNhanVien) {
      const formattedDate = editNhanVien.ngayNhap ? editNhanVien.ngayNhap.split('T')[0] : ''

      reset({
        id: editNhanVien.id || '',
        TenThietBi: editNhanVien.tenThietBi || '',
        SerialNumber: editNhanVien.serialNumber || '',
        ServiceTag: editNhanVien.serviceTag || '',
        LoaiThietBi: editNhanVien.loaiThietBi || '',
        DonViSuDung: editNhanVien.donViSuDung || '',
        NguoiQuanLy: editNhanVien.nguoiQuanLy || '',
        NgayNhap: formattedDate,
        TrangThai: editNhanVien.trangThai || '',
      })
    }
  }, [editNhanVien])

  // const fetchPB = async () => {
  //   const responsePB = await apiGetPB();
  //   // console.log('PB', responsePB);
  //   if (responsePB?.status) {
  //     setPhongBan(responsePB?.data);
  //   }
  // };
  // useEffect(() => {
  //   fetchPB();
  // }, []);

  const handleEditThietbi = async (data) => {
    // console.log('edit', data, editNhanVien?.id);
    const responseTB = await apiEditTB(editNhanVien?.id, data)
    if (responseTB.status) {
      toast.success(responseTB.message)
      reset()
      render()
      dispatch(showModal({ isShowModal: false, modalChildren: null }))
    } else {
      toast.error(responseTB.message)
    }
  }
  const onClose = () => {
    // setEditNhanVien(null);
    dispatch(showModal({ isShowModal: false, modalChildren: null }))
  }
  return (
    <div
      className="w-full relative bg-white h-[900px] lg:w-[900px] p-4 flex flex-col items-center gap-4 justify-center shadow-md border border-gray-200 rounded-md animate-slide-down"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute p-[2px] flex items-center right-4 top-4 bg-error border border-gray-300 shadow-sm hover:bg-red-600 rounded-md">
        <button onClick={onClose}>
          <RxCross2 size={26} color="white" />
        </button>
      </div>
      <div className="w-2/3 px-2 mx-auto mt-5 ">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleEditThietbi)}>
          <InputForm
            label="ID"
            register={register}
            errors={errors}
            id="id"
            validate={{
              required: 'vui lòng điền tên thiết bị',
            }}
            placeholder="@ tên thiết bị"
            fullWith
            readOnly
          />
          <InputForm
            label="Tên thiết bị"
            register={register}
            errors={errors}
            id="TenThietBi"
            validate={{
              required: 'vui lòng điền tên thiết bị',
            }}
            placeholder="@ tên thiết bị"
            fullWith
          />
          <InputForm
            label="SerialNumber"
            register={register}
            errors={errors}
            id="SerialNumber"
            // validate={{
            //   required: 'Vui lòng điền SerialNumber!',
            // }}
            placeholder="@SerialNumber"
            fullWith
          />

          <InputForm
            label="ServiceTag"
            register={register}
            errors={errors}
            id="ServiceTag"
            // validate={{
            //   required: 'Vui lòng điền ServiceTag!',
            // }}
            placeholder="@ServiceTag"
            fullWith
          />
          <InputForm
            label="Loại thiết bị"
            register={register}
            errors={errors}
            id="LoaiThietBi"
            validate={{
              required: 'Vui lòng điền loại thiết bị!',
            }}
            placeholder="@LoaiThietBi"
            fullWith
          />
          <InputForm
            label="Đơn vị sử dụng"
            register={register}
            errors={errors}
            id="DonViSuDung"
            validate={{
              required: 'Vui lòng điền Đơn vị sử dụng',
            }}
            placeholder="@DonViSuDung"
            fullWith
          />
          {/* <Select
            label="Phòng ban"
            options={phongbans?.map((el) => ({
              code: el?.idphongBan,
              value: el?.tenPhongBan,
            }))}
            register={register}
            id="idPhongBan"
            validate={{
              required: 'Vui lòng chọn Phòng ban',
              setValueAs: (v) => +v, // ép kiểu từ chuỗi thành số
            }}
            style="flex-auto "
            errors={errors}
          /> */}
          <InputForm
            label="Người quản lí"
            register={register}
            errors={errors}
            id="NguoiQuanLy"
            validate={{
              required: 'Vui lòng điền đơn vị quản lí',
            }}
            placeholder="@NguoiQuanLy"
            fullWith
          />

          <InputForm
            label="Ngày nhập"
            id="NgayNhap"
            type="date"
            register={register}
            errors={errors}
            validate={{
              required: 'Vui lòng chọn ngày!',
            }}
          />
          <InputForm
            label="Trạng thái"
            register={register}
            errors={errors}
            id="TrangThai"
            validate={{
              required: 'Vui lòng điền trạng thái',
            }}
            placeholder="@TrangThai"
            fullWith
          />

          <div className="mt-3">
            <Button type="submit">Cập nhật thiết bị</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(ModalEditTB)
