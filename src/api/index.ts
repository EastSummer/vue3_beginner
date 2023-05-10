
export interface IApiObj {
  urlKey: string,
  params: any,
}

// const prefix = '/api'
const prefix = ''

const apis: any = {
  login: '/user/login',
  signup: '/users/',
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