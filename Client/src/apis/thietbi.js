import axios from './axios'

export const apiCreateTB = (data) =>
  axios({
    url: '/thietbi/createTB',
    method: 'post',
    data,
  })

export const apiGetTB = (begind, endd) =>
  axios({
    url: '/thietbi/getTB',
    method: 'get',
    params: {
      begind,
      endd,
    },
  })

export const apiDeleteTB = (id) =>
  axios({
    url: `/thietbi/delete/${id}`,
    method: 'delete',
  })

export const apiEditTB = (id, data) =>
  axios({
    url: `/thietbi/update/${id}`,
    method: 'put',
    data,
  })

export const apiExportExcel = (begind, endd) =>
  axios({
    url: '/thietbi/exportExcel',
    method: 'get',
    params: {
      begind,
      endd,
    },
    responseType: 'blob',
  })
