<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-23 13:37:30
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-06-19 15:17:45
-->
<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="columns.data"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
       @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script setup lang="ts">
import ColumnList from '@/components/ColumnList.vue'
import useLoadMore from '@/hooks/useLoadMore';
import { useMainStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const store = useMainStore()
const { columns } = storeToRefs(store)
const total = computed(() => store.columns.total)
const { loadMorePage, isLastPage } = useLoadMore(
  'fetchColumns',
  total,
  { pageSize: 3, currentPage: 2 },
)

onMounted(() => {
  store.fetchColumns({ pageSize: 3 })
})

</script>