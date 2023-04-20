/*
 * @Descripttion:
 * @version:
 * @Author: EastSummer
 * @Date: 2021-06-24 08:46:03
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-04-07 15:17:56
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

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
        // get 请求，添加到 url 中
        if (config.method === 'get') {
          config.params = { ...config.params, icode: '3074FF74C3C8A38A' }
        }
        // 其他请求，添加到 body 中
        // 如果是上传文件，添加到 FormData 中
        if (config.data instanceof FormData) {
          config.data.append('icode', '3074FF74C3C8A38A')
        } else {
        // 普通的 body 对象，添加到 data 中
          config.data = { ...config.data, icode: '3074FF74C3C8A38A' }
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
        // 下载文件
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/octet-stream')) {
          // downloadBlob(response)
          return { status: 0 }
        }
        return response
      },
      (error) => {
        // 响应失败处理
        console.warn(error)
        return Promise.reject(error)
      },
    )
  }

  // 获取axios
  getAxios(): AxiosInstance {
    return this.service
  }
}
