/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-05-08 10:08:01
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-08 10:33:06
 */
import { createApp } from "vue"
import MessageVue, { IMessageType } from "./Message.vue"

const createMessage = (message: string, type: IMessageType, time = 2000) => {
  const messageInstance = createApp(MessageVue, {
    message,
    type,
  })

  // 创建挂载节点
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  // 组件挂载到节点上
  messageInstance.mount(mountNode)
  const timer = setTimeout(() => {
    // 销毁组件
    messageInstance.unmount()
    // 删除挂载节点
    document.body.removeChild(mountNode)
    if (timer) clearTimeout(timer)
  }, time)
}

export default createMessage
