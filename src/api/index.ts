
export interface IApiObj {
  urlKey: string,
  params: any,
}

const prefix = '/api'

const apis: any = {
  columns: '/columns', // 查询子专题枚举
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