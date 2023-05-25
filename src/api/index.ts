/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-04-07 14:33:11
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-17 14:31:13
 */

export interface IApiObj {
  urlKey: string,
  params: any,
}

// const prefix = '/api'
const prefix = ''

const apis: any = {
  login: '/user/login',
  signup: '/users/',
  upload: '/upload',
}

export default function getApi(key: string | IApiObj): string {
  if (typeof key === 'object') {
    const params = key.params
    const paramsArr: any = []
    Object.keys(params).map((e: any) => paramsArr.push(`${e}=${params[e]}`))
    return `${prefix}${apis[key.urlKey]}?${paramsArr.join('&')}`
  }
  return `${prefix}${apis[key]}`
}