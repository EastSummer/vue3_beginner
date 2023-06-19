/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-29 15:35:24
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-19 15:22:09
 */
import { defineStore } from 'pinia'
import httpRequest from '@/utils/httpRequest'

export interface IUserProps {
  isLogin?: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string;
  avatar?: IImageProps
  description?: string
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
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: IImageProps | string
  createdAt?: string
  column: string
  author?: string | IUserProps
  isHTML?: boolean
}
export interface IAccount {
  email: string
  password: string
}
export interface IGlobalErrorProps {
  status: boolean
  message?: string
}
export interface IGlobalDataProps {
  token: string
  error: IGlobalErrorProps
  loading: boolean
  columns: { data: IColumnProps[]; total: number }
  posts: IPostProps[]
  user: IUserProps
}

export const useMainStore = defineStore('main', {
  state: (): IGlobalDataProps => ({
    columns: { data: [], total: 0 },
    posts: [],
    user: { isLogin: false },
    loading: false,
    token: localStorage.getItem('token') || '',
    error: { status: false }
  }),
  getters: {
    getColumnById: (state) => {
      return (id: string) => state.columns.data.find(col => col._id === id)
    },
    getPostsByColId: (state) => {
      return (colId: string) => state.posts.filter(post => post.column === colId)
    },
    getCurrentPost: (state) => {
      return (id: string) => state.posts.find(post => post._id === id)
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
    fetchColumns(params: {currentPage?: number, pageSize?: number} = {}) {
      // httpRequest.get<IColumnsProps>('/columns').then(res => {
      //   this.columns.data = res.data.list
      // })
      const { currentPage = 1, pageSize = 6 } = params
      return httpRequest.get<IColumnsProps>(
        `/columns?currentPage=${currentPage}&pageSize=${pageSize}`
      ).then(res => {
        const { data } = this.columns
        const { list, count } = res.data
        this.columns.data = res.data.list
        this.columns = {
          data: [...data, ...list],
          total: count,
        }
      })
    },
    fetchColumn(cid: string) {
      httpRequest.get<IColumnProps>(`/columns/${cid}`).then(res => {
        this.columns.data = [res.data]
      })
    },
    fetchPosts(cid: string) {
      httpRequest.get<IPostsProps>(`/columns/${cid}/posts`).then(res => {
        this.posts = res.data.list
      })
    },
    fetchPost(id: string) {
      return httpRequest.get<IPostProps>(`/posts/${id}`).then(res => {
        this.posts = [res.data]
        return res.data
      })
    },
    deletePost(id: string) {
      return httpRequest.delete<IPostProps>(`/posts/${id}`).then(res => {
        this.posts = this.posts.filter(post => post._id !== res.data._id)
        return res.data
      })
    },
    updatePost({id, data}: {id: string, data: IPostProps}) {
      return httpRequest.patch<IPostProps, IPostProps>({
        url: `/posts/${id}`,
        data,
      }).then(res => {
        this.posts = this.posts.map(post => {
          if (post._id === res.data._id) {
            return data
          } else {
            return post
          }
        })
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
