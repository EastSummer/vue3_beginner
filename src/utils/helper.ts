/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-05-26 15:33:29
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-09 16:28:16
 */
import createMessage from "@/components/createMessage"
import { IColumnProps, IImageProps, IUserProps } from "@/stores"

// https://help.aliyun.com/document_detail/44688.html#title-y1e-xd2-5oo
export function generateFitUrl(data: IImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function addColumnAvatar(data: IColumnProps | IUserProps, width: number, height: number) {
  if (data?.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as IColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}

interface ICheckCondition {
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck(file: File, condition: ICheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式!', 'error', 2000)
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过 1Mb', 'error', 2000)
  }
  return passed
}

interface ITestProps {
  _id: string
  name: string
}
const testData1: ITestProps[] = [
  { _id: '1', name: 'a' },
  { _id: '2', name: 'b' },
]
const testData2: Record<string, ITestProps> = {
  1: { _id: '1', name: 'a' },
  2: { _id: '2', name: 'b' }
}
// 1 -> 2
export const arrToObj = <T extends {_id: string}>(arr: T[]) => 
  arr.reduce((prev, current)=>{
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as Record<string, T>)
// 2 -> 1
export const objToArr = <T>(obj: Record<string, T>) =>
  Object.keys(obj).map(key => obj[key])
// JS中object的key，传数字类型，会默认转化为string
const result1 = arrToObj(testData1)
const result2 = objToArr(testData2)
