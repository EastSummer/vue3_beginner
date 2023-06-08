/*
 * @Descripttion:
 * @version:
 * @Author: EastSummer
 * @Date: 2021-06-24 08:46:03
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-07 10:51:55
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
        if (config.method === 'get' || config.method === 'delete') {
          config.params = { ...config.params, icode: '8EEB11431E897A1E' }
        }
        // 其他请求，添加到 body 中
        // 如果是上传文件，添加到 FormData 中
        if (config.data instanceof FormData) {
          config.data.append('icode', '8EEB11431E897A1E')
        } else {
        // 普通的 body 对象，添加到 data 中
          config.data = { ...config.data, icode: '8EEB11431E897A1E' }
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
        // 服务器返回错误是e.response.data， 网络错误是e.message
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
