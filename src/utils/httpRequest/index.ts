/*
 * @Descripttion:
 * @version:
 * @Author: chenpengfei
 * @Date: 2021-06-29 16:17:06
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-06 16:05:48
 */
import {
  AxiosInstance, AxiosRequestConfig,
} from 'axios'
import getApi, { IApiObj } from '@/api/index'
import Interceptors from './interceptors'
import Config from './config'

interface IConfig<T> {
  url: string | IApiObj
  data?: T
  options?: AxiosRequestConfig | undefined
  useCatch?: boolean
}

interface IRes<T> {
  code: number
  data: T
  msg: string
}

class HttpRequest {
  axios: AxiosInstance

  constructor() {
    this.axios = new Interceptors(Config).getAxios()
  }

  // Post JONS 请求
  post<T, U>(config: IConfig<T>): Promise<IRes<U>> {
    const {
      url, data = {}, options = {}, useCatch = false,
    } = config
    const requestURL = getApi(url)
    return new Promise((resolve: any, reject) => {
      this.axios.post(requestURL, data, options).then(
        (res) => {
          const { code, message } = res.data
          // 处理业务错误
          if (code !== 0) {
            if (useCatch) reject(res.data)
          } else {
            resolve(res.data)
          }
        },
      ).catch((error: any) => {
        if (useCatch) reject(error)
      })
    })
  }

  // Get JONS 请求
  get<T>(url:string, useCatch = false): Promise<IRes<T>> {
    return new Promise((resolve: any, reject) => {
      this.axios.get(url).then(
        (res) => {          
          const { code, msg } = res.data
          // 处理业务错误
          if (code !== 0) {
            if (useCatch) reject(res.data)
          } else {
            resolve(res.data)
          }
        },
      ).catch((error: any) => {
        if (useCatch) reject(error)
      })
    })
  }

  // Patch JONS 请求
  patch<T, U>(config: IConfig<T>): Promise<IRes<U>> {
    const {
      url, data = {}, options = {}, useCatch = false,
    } = config
    return new Promise((resolve: any, reject) => {
      this.axios.patch(url as string, data, options).then(
        (res) => {
          const { code, message } = res.data
          // 处理业务错误
          if (code !== 0) {
            if (useCatch) reject(res.data)
          } else {
            resolve(res.data)
          }
        },
      ).catch((error: any) => {
        if (useCatch) reject(error)
      })
    })
  }

  // Delete JONS 请求
  delete<T>(url: string, useCatch = false): Promise<IRes<T>> {
    return new Promise((resolve: any, reject) => {
      this.axios.delete(url).then(
        (res) => {
          const { code, message } = res.data
          // 处理业务错误
          if (code !== 0) {
            if (useCatch) reject(res.data)
          } else {
            resolve(res.data)
          }
        },
      ).catch((error: any) => {
        if (useCatch) reject(error)
      })
    })
  }
}

const httpRequest = new HttpRequest()
export default httpRequest
