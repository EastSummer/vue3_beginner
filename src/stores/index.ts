/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-29 15:35:24
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-04-20 18:40:28
 */
import { defineStore } from 'pinia'
import httpRequest from '@/utils/httpRequest'

interface IUserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
export interface IColumnsProps {
  count: number
  pageSize: number
  currentPage: number
  list: IColumnProps[]
}
export interface IColumnProps {
  _id: string;
  title: string;
  avatar?: IImageProps;
  description: string;
}
export interface IImageProps {
  _id?: string
  url?: string
  createAt?: string
}
export interface IPostsProps {
  count: number
  list: IPostProps[]
}
export interface IPostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: IImageProps
  createdAt: string
  column: string
}

export const useMainStore = defineStore('main', {
  state: () => ({
    columns: [] as IColumnProps[],
    posts: [] as IPostProps[],
    user: {
      isLogin: false,
      columnId: 1,
    } as IUserProps,
  }),
  getters: {
    getColumnById: (state) => {
      return (id: string) => state.columns.find(col => col._id === id)
    },
    getPostsByColId: (state) => {
      return (colId: string) => state.posts.filter(post => post.column === colId)
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
    },
    fetchColumns() {      
      httpRequest.get<IColumnsProps>('/columns').then(res => {
        this.columns = res.data.list
      })
    },
    fetchColumn(cid: string) {
      httpRequest.get<IColumnProps>(`/columns/${cid}`).then(res => {
        this.columns = [res.data]
      })
    },
    fetchPosts(cid: string) {
      httpRequest.get<IPostsProps>(`/columns/${cid}/posts`).then(res => {
        this.posts = res.data.list
      })
    }
  },
})
