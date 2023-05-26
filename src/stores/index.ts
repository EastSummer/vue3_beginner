/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-29 15:35:24
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-05-26 19:13:19
 */
import { defineStore } from 'pinia'
import httpRequest from '@/utils/httpRequest'

export interface IUserProps {
  isLogin?: boolean
  nickName?: string
  _id?: string
  column?: string
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
  fitUrl?: string
}
export interface IPostsProps {
  count: number
  list: IPostProps[]
}
export interface IPostProps {
  // _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: IImageProps | string
  createdAt?: string
  column: string
  author?: string
}
export interface IAccount {
  email: string
  password: string
}
export interface IGlobalErrorProps {
  status: boolean
  message?: string
}

export const useMainStore = defineStore('main', {
  state: () => ({
    columns: [] as IColumnProps[],
    posts: [] as IPostProps[],
    user: {
      isLogin: false,
    } as IUserProps,
    loading: false,
    token: localStorage.getItem('token') || '',
    error: { status: false } as IGlobalErrorProps
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
    login(data: IAccount) {
      return httpRequest.post<IAccount, any>({
        url: 'login',
        data,
      }).then(res => {
        const { token } = res.data
        this.token = token
        localStorage.setItem('token', token)
        httpRequest.axios.defaults.headers.common.Authorization = `Bearer ${token}`
        return this.fetchCurrentUser()
      })
    },
    logout() {
      this.token = ''
      this.user = { isLogin: false }
      localStorage.removeItem('token')
      delete httpRequest.axios.defaults.headers.common.Authorization
    },
    createPost(newPost: IPostProps) {
      return httpRequest.post<IPostProps, IPostProps>({
        url: 'posts',
        data: newPost,
      }).then(res => {
        this.posts.push(res.data)
      })
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
    },
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(e: IGlobalErrorProps) {
      this.error = e
    },
    fetchCurrentUser() {
      return httpRequest.get<IUserProps>('/user/current').then(res => {
        this.user = {
          isLogin: true,
          ...res.data
        }
        return res.data
      })
    },
  },
})
