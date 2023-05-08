/*
 * @Descripttion:
 * @version:
 * @Author: EastSummer
 * @Date: 2021-06-24 08:46:03
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-08 11:10:37
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useMainStore } from '@/stores'


export default class Interceptors {
  service: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.setInterceptors()
  }

  // 拦截
  setInterceptors(): void {
    // 请求拦截
    this.service.interceptors.request.use(
      (config) => {
        // loading
        const store = useMainStore()
        store.setLoading(true)
        store.error = { status: false, message: '' }
        // get 请求，添加到 url 中
        if (config.method === 'get') {
          config.params = { ...config.params, icode: '12FFC5220EF64886' }
        }
        // 其他请求，添加到 body 中
        // 如果是上传文件，添加到 FormData 中
        if (config.data instanceof FormData) {
          config.data.append('icode', '12FFC5220EF64886')
        } else {
        // 普通的 body 对象，添加到 data 中
          config.data = { ...config.data, icode: '12FFC5220EF64886' }
        }
        return config
      },
      (error) => {
        // 请求错误处理
        console.log(error)
      },
    )
    // 响应拦截
    this.service.interceptors.response.use(
      (response): any => {
        // loading
        const store = useMainStore()
        const timer = setTimeout(() => {
          store.setLoading(false)
          if (timer) clearTimeout(timer)
        }, 500);
        // 下载文件
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/octet-stream')) {
          // downloadBlob(response)
          return { status: 0 }
        }
        return response
      },
      (e) => {
        // loading
        const store = useMainStore()
        store.setLoading(false)
        const { error } = e.response.data
        store.error = { status: true, message: error }
        // 响应失败处理
        console.warn(e.response.data)
        return Promise.reject(e.response.data)
      },
    )
  }

  // 获取axios
  getAxios(): AxiosInstance {
    return this.service
  }
}
