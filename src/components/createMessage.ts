/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-05-08 10:08:01
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-10 15:00:07
 */
import { h, render } from "vue"
import MessageVue, { IMessageType } from "./Message.vue"

const createMessage = (message: string, type: IMessageType, time?: number) => {
  const messageVnode = h(MessageVue, {
    message,
    type,
  })

  // 创建挂载节点
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  // 组件挂载到节点上
  render(messageVnode, mountNode)
  const destory = () => {
    // 销毁组件
    render(null, mountNode)
    // 删除挂载节点
    document.body.removeChild(mountNode)
  }
  if (time) {
    const timer = setTimeout(() => {
      destory()
      if (timer) clearTimeout(timer)
    }, time)
  }
  return {
    destory
  } 
}

export default createMessage
