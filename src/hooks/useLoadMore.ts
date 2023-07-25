/*
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-06-19 13:38:04
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-19 14:12:16
 */
import { useMainStore } from "@/stores"
import { Store } from "pinia"
import { ComputedRef, computed, reactive, ref } from "vue"


interface ILoadParams {
  currentPage: number
  pageSize: number
}

const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: ILoadParams = {currentPage: 2, pageSize: 5}
) => {
  const store = useMainStore() as Store<string, any>
  const currentPage = ref(params.currentPage)
  const requestParams = reactive({
    // 为什么这里不能使用
    // currentPage: currentPage.value,
    currentPage,
    pageSize: params.pageSize,
  })
  // 或者使用computed
  // const requestParams = computed(() => ({
  //   currentPage: currentPage.value,
  //   pageSize: params.pageSize,
  // }))
  const loadMorePage = () => {
    // 使用vuex的时候是
    // store.dispatch(actionName, requestParams).then
    // 使用pinia的时候是
    store[actionName](requestParams).then(() => {
    // store.fetchColumns(requestParams).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage,
  }
}

export default useLoadMore
