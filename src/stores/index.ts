/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-29 15:35:24
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-31 11:14:50
 */
import { defineStore } from 'pinia'
import { testData, testPosts, IPostProps } from '@/testData'
export type { IColumnProps, IPostProps } from '@/testData'

interface IUserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

export const useMainStore = defineStore('main', {
  state: () => ({
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
      columnId: 1,
    } as IUserProps,
  }),
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter(col => col.id > 2).length
    },
    getColumnById: (state) => {
      return (id: number) => state.columns.find(col => col.id === id)
    },
    getPostsByColId: (state) => {
      return (colId: number) => state.posts.filter(post => post.columnId === colId)
    }
  },
  actions: {
    login() {
      this.user = {
        ...this.user,
        isLogin: true,
        name: 'EastSummer',
      }
    },
    createPost(newPost: IPostProps) {
      this.posts.push(newPost)
    }
  },
})
