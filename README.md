<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-02-16 15:49:27
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-07-25 10:41:08
-->
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


### EsLint配置踩坑
1. [EsLint配置](https://www.jianshu.com/p/4b94540dd998)
2. [Ts配置替换](https://coding.imooc.com/learn/questiondetail/4daeRY4pedWYnWEp.html)


### Vite配置踩坑
1. https://www.cnblogs.com/tbfboke/p/16738297.html
2. [Vite中配置@别名](./src/docs/vite-alias.md)
3. [环境变量](https://vitejs.cn/guide/env-and-mode.html#env-variables)
4. 配置
  1. https://www.weipxiu.com/8649.html
  2. https://blog.csdn.net/qq_34621851/article/details/123088841
5. [vite+jsx/tsx](https://blog.csdn.net/qq_43699122/article/details/128066935)

### Vue Router 4
1.[官方文档](https://router.vuejs.org/zh/)
2.[Vue Router 和 组合式 API](https://router.vuejs.org/zh/guide/advanced/composition-api.html)

### Pinia
1. [官方文档](https://pinia.vuejs.org/zh/introduction.html)
2. [Vue上的推荐](https://cn.vuejs.org/guide/scaling-up/state-management.html#pinia)

### vue3
* [生命周期](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)
* Api
  * 全局 API
    * ```nextTick``` (使用 nextTick 包裹以后，会在上一次执行完毕，再执行下一次)
  * 组合式 API
    * [setup](./src/docs/setup-api.md)
    * [ref](https://cn.vuejs.org/api/reactivity-core.html#ref)
  * provide & inject
    * [provide](./src/demo/provide.vue)
    * [inject](./src/demo/inject.vue)
  * 单文件组件
    * [defineExpose 暴露组件方法](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)
    * [CSS 功能](https://cn.vuejs.org/api/sfc-css-features.html#sfc-css-features)
  * TypeScript 工具类型
    * [PropType<T>](https://cn.vuejs.org/api/utility-types.html#proptype-t)
* 内置组件
  * [Transition](https://cn.vuejs.org/guide/built-ins/transition.html)
  * [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive.html)
  * [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)
  * [Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html)
* [响应性语法糖(已废弃)](./src/docs/ref-sugar.md)
* 支持多标签，不需要root节点(Fragment-碎片化节点)
* 
* 
* https://coding.imooc.com/learn/questiondetail/lz14NYLqLagXK2p9.html
* 
* 

### 插件
1. [Mitt](./src/docs/mitt.md)
2. [Vue Devtools](https://devtools.vuejs.org/guide/installation.html)
3. [commit msg validator](./src/docs/commit-hooks.md)

### others
1. [副作用](https://coding.imooc.com/learn/questiondetail/gDANwPNllzzXK120.html)
2. [Html 标签中以 aria- 开头的属性是什么](https://zhuanlan.zhihu.com/p/472243961)
3. [URL对象](./src/docs/url.md)
4. [git-flow 的工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow/)
5. [什么是跨域? 出现原因及解决方法](https://segmentfault.com/a/1190000040485198)
6. [JWT](https://blog.csdn.net/weixin_45410366/article/details/125031959)
7. [原型工具](https://whimsical.com/)
8. [win10突然打不开sourcetree](https://zhuanlan.zhihu.com/p/637566727)
9. 部署托管(vercel & zeabur)

### 一些自定规范
* 使用大驼峰（PascalCase）命名组件和使用组件。
* 接口使用 I(Interface) + PascalCase 命名

### 参考
* [Vue3 入门指南与实战案例](https://vue3.chengpeiquan.com/) | [Github](https://github.com/chengpeiquan/learning-vue3)